import { Injectable, BadRequestException, UnauthorizedException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ReferralCode } from '../referral/entities/referral-code.entity';
import { MESSAGES } from '../constants/messages';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { Reward } from '../rewards/entities/reward.entity';
import { ReferralType } from '../referral/entities/referral-code.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ReferralCode)
    private referralCodeRepository: Repository<ReferralCode>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @InjectRepository(Reward)
    private rewardsRepository: Repository<Reward>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      select: ['id', 'email', 'fullName', 'mobile'] 
    });
    
    if (!user) {
      throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
    }
    
    return user;
  }

  async register(registerDto: RegisterDto) {
    // Check for duplicate email
    const existingEmail = await this.usersRepository.findOne({
      where: { email: registerDto.email }
    });
    if (existingEmail) {
      throw new BadRequestException(MESSAGES.USER.EMAIL_EXISTS);
    }

    // Check for duplicate mobile
    const existingMobile = await this.usersRepository.findOne({
      where: { mobile: registerDto.mobile }
    });
    if (existingMobile) {
      throw new BadRequestException(MESSAGES.USER.MOBILE_EXISTS);
    }

    let referralCodeId: number | null = null;

    // Check if referral code exists and is valid
    if (registerDto.referralCode) {
      const referralCode = await this.referralCodeRepository.findOne({
        where: {
          code: registerDto.referralCode,
          isActive: true,
        },
      });

      if (!referralCode) {
        throw new BadRequestException(MESSAGES.REFERRAL.INVALID_CODE);
      }

      referralCodeId = referralCode.id;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create new user with only the fields that exist in the User entity
    const user = this.usersRepository.create({
      fullName: registerDto.fullName,
      email: registerDto.email,
      mobile: registerDto.mobile,
      password: hashedPassword,
      address: registerDto.address,
      referralCodeId: referralCodeId,
    });

    await this.usersRepository.save(user);
    
    return {
      message: MESSAGES.USER.REGISTER_SUCCESS,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
      }
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
      select: ['id', 'email', 'password', 'fullName', 'mobile'],
    });

    if (!user) {
      throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    // Generate JWT token
    const token = await this.authService.generateToken(user);

    // Remove password from response
    const { password, ...result } = user;
    
    return {
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      user: result,
      ...token
    };
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'fullName', 'mobile'], // Include password for validation
    });
  }

  async getDashboardData(userId: number) {
    // Get all rewards for the user
    const rewards = await this.rewardsRepository.find({
      where: { userId },
      relations: ['referralCode'],
      order: { createdAt: 'DESC' },
    });

    // Calculate totals
    const totalPoints = rewards.reduce((sum, reward) => sum + Number(reward.points), 0);
    
    const downlineReferralPoints = rewards
      .filter(reward => reward.type === ReferralType.DOWNLINE)
      .reduce((sum, reward) => sum + Number(reward.points), 0);
    
    const registrationReferralPoints = rewards
      .filter(reward => reward.type === ReferralType.REGISTRATION)
      .reduce((sum, reward) => sum + Number(reward.points), 0);

    // Get recent rewards (last 5)
    const recentRewards = rewards.slice(0, 5).map(reward => ({
      points: Number(reward.points),
      type: reward.type,
      createdAt: reward.createdAt,
    }));

    return {
      message: MESSAGES.USER.DASHBOARD_SUCCESS,
      data: {
        totalPoints,
        downlineReferralPoints,
        registrationReferralPoints,
        recentRewards,
      }
    };
  }
} 
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ReferralCode } from '../referral/entities/referral-code.entity';
import { MESSAGES } from '../constants/messages';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ReferralCode)
    private referralCodeRepository: Repository<ReferralCode>,
  ) {}

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
    // Find user by email
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
      select: ['id', 'email', 'password', 'fullName', 'mobile'], // Explicitly select password field
    });

    if (!user) {
      throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    // Remove password from response
    const { password, ...result } = user;
    
    return {
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      user: result
    };
  }
} 
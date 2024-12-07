import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<Omit<User, 'password'>> {
    // Check if email already exists
    const existingEmail = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Check if mobile already exists
    const existingMobile = await this.usersRepository.findOne({
      where: { mobile: registerDto.mobile },
    });
    if (existingMobile) {
      throw new ConflictException('Mobile number already exists');
    }

    // Validate referral code if provided
    if (registerDto.referralCode) {
      const referrer = await this.usersRepository.findOne({
        where: { referralCode: registerDto.referralCode },
      });
      if (!referrer) {
        throw new BadRequestException('Invalid referral code');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    // Create new user
    const user = this.usersRepository.create({
      fullName: registerDto.fullName,
      email: registerDto.email,
      mobile: registerDto.mobile,
      password: hashedPassword,
      referralCode: this.generateReferralCode(registerDto.fullName),
      address: registerDto.address,
    });

    // Save user
    await this.usersRepository.save(user);

    // Remove password from response
    const { password, ...result } = user;
    return result;
  }

  private generateReferralCode(fullName: string): string {
    const prefix = fullName.substring(0, 3).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}${random}`;
  }
} 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReferralCode } from './entities/referral-code.entity';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(ReferralCode)
    private referralCodeRepository: Repository<ReferralCode>,
  ) {}

  async findAll(): Promise<ReferralCode[]> {
    return this.referralCodeRepository.find();
  }

  async findByCode(code: string): Promise<ReferralCode> {
    return this.referralCodeRepository.findOne({ where: { code } });
  }

  // More methods will be added when admin functionality is implemented
} 
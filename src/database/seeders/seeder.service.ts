import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReferralCode } from '../../referral/entities/referral-code.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(ReferralCode)
    private referralCodeRepository: Repository<ReferralCode>,
  ) {}

  async seedReferralCodes() {
    const referralCodes = [
      {
        code: 'WELCOME2024',
        isActive: true,
        description: 'Welcome offer for 2024',
        createdBy: 1,
        updatedBy: 1,
      },
      {
        code: 'NEWUSER50',
        isActive: true,
        description: 'New user discount code',
        createdBy: 1,
        updatedBy: 1,
      },
      {
        code: 'SPECIAL25',
        isActive: true,
        description: 'Special discount code',
        createdBy: 1,
        updatedBy: 1,
      },
      {
        code: 'FRIEND100',
        isActive: true,
        description: 'Friend referral bonus',
        createdBy: 1,
        updatedBy: 1,
      },
      {
        code: 'VIP2024',
        isActive: true,
        description: 'VIP member code',
        createdBy: 1,
        updatedBy: 1,
      },
    ];

    for (const referralCode of referralCodes) {
      const exists = await this.referralCodeRepository.findOne({
        where: { code: referralCode.code },
      });
      
      if (!exists) {
        await this.referralCodeRepository.save(referralCode);
      }
    }
  }
} 
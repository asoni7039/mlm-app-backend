import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReferralCode, ReferralType } from '../../referral/entities/referral-code.entity';

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
        type: ReferralType.REGISTRATION,
        rewardMultiplier: 1.0,
        description: 'Registration referral code with 1x reward',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        code: 'DOWNLINE50',
        type: ReferralType.DOWNLINE,
        rewardMultiplier: 2.0,
        description: 'Downline referral code with 2x reward',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        code: 'SPECIAL25',
        type: ReferralType.REGISTRATION,
        rewardMultiplier: 1.0,
        description: 'Special registration code with 1x reward',
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        code: 'TEAM100',
        type: ReferralType.DOWNLINE,
        rewardMultiplier: 2.0,
        description: 'Team downline code with 2x reward',
        isActive: true,
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
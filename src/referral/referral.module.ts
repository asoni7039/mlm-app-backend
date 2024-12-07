import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralCode } from './entities/referral-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReferralCode])],
})
export class ReferralModule {} 
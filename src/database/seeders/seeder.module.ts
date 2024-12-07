import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { ReferralCode } from '../../referral/entities/referral-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReferralCode])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {} 
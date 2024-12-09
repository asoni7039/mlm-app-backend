import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reward])],
  exports: [TypeOrmModule],
})
export class RewardsModule {} 
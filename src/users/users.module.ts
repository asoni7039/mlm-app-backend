import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ReferralCode } from '../referral/entities/referral-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ReferralCode])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {} 
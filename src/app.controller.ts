import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { MESSAGES } from './constants/messages';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get('test-db')
  async testDB() {
    try {
      await this.usersRepository.find();
      return { message: MESSAGES.DATABASE.CONNECTION_SUCCESS };
    } catch (error) {
      return { 
        error: MESSAGES.DATABASE.CONNECTION_FAILED, 
        details: error.message 
      };
    }
  }
}

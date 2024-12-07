import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';

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
      return { message: 'Database connection is working!!' };
    } catch (error) {
      return { error: 'Database connection failed', details: error.message };
    }
  }
}

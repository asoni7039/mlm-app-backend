import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async generateToken(user: User) {
    const payload = { 
      sub: user.id,
      email: user.email,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 
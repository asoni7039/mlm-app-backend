import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'User has been successfully created.' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request - Validation failed' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Email or mobile already exists' 
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }
} 
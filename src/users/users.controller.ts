import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { MESSAGES } from '../constants/messages';
import { DashboardResponseDto } from './dto/dashboard.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req, @Body() loginDto: LoginDto) {
    const token = await this.authService.generateToken(req.user);
    return {
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      user: req.user,
      ...token
    };
  }

  @Get('profile')
  @Auth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    return {
      message: MESSAGES.USER.PROFILE_RETRIEVED,
      user: req.user
    };
  }

  @Get('dashboard')
  @Auth()
  @ApiOperation({ summary: 'Get user dashboard data' })
  @ApiResponse({ 
    status: 200, 
    description: 'Dashboard data retrieved successfully',
    type: DashboardResponseDto 
  })
  async getDashboard(@Request() req) {
    return this.usersService.getDashboardData(req.user.id);
  }
} 
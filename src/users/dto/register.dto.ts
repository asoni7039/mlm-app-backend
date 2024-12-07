import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../decorators/match.decorator';

export class RegisterDto {
  @ApiProperty({ 
    example: 'John Doe',
    description: 'The full name of the user' 
  })
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Full name cannot exceed 100 characters' })
  fullName: string;

  @ApiProperty({ 
    example: 'john@example.com',
    description: 'The email address of the user' 
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ 
    example: '1234567890',
    description: 'The mobile number of the user' 
  })
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Mobile number must be 10 digits' })
  mobile: string;

  @ApiProperty({ 
    example: 'Test@123',
    description: 'The password for the account' 
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @ApiProperty({ 
    example: 'Test@123',
    description: 'Confirm the password' 
  })
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confPassword: string;

  @ApiProperty({ 
    example: 'ABC123',
    description: 'Optional referral code',
    required: false
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  referralCode?: string;

  @ApiProperty({ 
    example: '123 Main St, City',
    description: 'Optional address',
    required: false
  })
  @IsString()
  @IsOptional()
  address?: string;
} 
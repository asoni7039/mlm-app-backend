import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'super-secret-key',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
})); 
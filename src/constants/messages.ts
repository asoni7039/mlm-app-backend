export const MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    LOGIN_SUCCESS: 'Login successful',
  },
  USER: {
    REGISTER_SUCCESS: 'User successfully registered',
    EMAIL_EXISTS: 'Email already exists',
    MOBILE_EXISTS: 'Mobile number already exists',
  },
  REFERRAL: {
    INVALID_CODE: 'Invalid or inactive referral code',
    CODE_USED: 'This referral code has already been used',
    SEEDING_SUCCESS: 'Seeding completed successfully',
    SEEDING_FAILED: 'Seeding failed',
  },
  DATABASE: {
    CONNECTION_SUCCESS: 'Database connection is working!',
    CONNECTION_FAILED: 'Database connection failed',
  },
  VALIDATION: {
    PASSWORD_MATCH: 'Passwords must match',
    INVALID_MOBILE: 'Invalid mobile number format',
    REQUIRED_FIELD: 'This field is required',
    MIN_LENGTH: 'Minimum length should be',
    INVALID_EMAIL: 'Invalid email format',
  },
  GENERIC: {
    INTERNAL_ERROR: 'An internal server error occurred',
    NOT_FOUND: 'Resource not found',
    SUCCESS: 'Operation completed successfully',
  },
}; 
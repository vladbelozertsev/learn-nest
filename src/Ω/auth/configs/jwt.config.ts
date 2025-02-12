import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => {
  return {
    signOptions: { expiresIn: '60s' },
    secret: process.env.JWT_SECRET,
  };
});

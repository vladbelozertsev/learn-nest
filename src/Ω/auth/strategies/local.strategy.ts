import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly $auth: AuthService) {
    // passport strategy tries to find this fields in req.body
    // property that we add by first step (gql-auth.guard.ts)
    super({ usernameField: 'email', passwordField: 'password' });
  }

  // LOGIN_STEP_#2
  async validate(email?: string, password?: string) {
    const isEmail = !!email && typeof email === 'string';
    const isPass = !!password && typeof password === 'string';
    if (!isEmail || !isPass) throw new UnauthorizedException('DATA_NOT_PROVIDED');
    const user = await this.$auth.validateUser({ email, password });
    if (user.emailVerified) return user;
    await this.$auth.verifyEmail(user).catch(console.error);
    throw new UnauthorizedException('EMAIL_NOT_VERIFIED');
  }
}

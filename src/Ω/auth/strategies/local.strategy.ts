import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // passport strategy tries to find this fields in req.body
    // property that we add by first step (gql-auth.guard.ts)
    super({ usernameField: 'email', passwordField: 'password' });
  }

  // LOGIN_STEP_#2
  async validate(email?: string, password?: string) {
    const isEmail = !!email && typeof email === 'string';
    const isPass = !!password && typeof password === 'string';
    if (!isEmail || !isPass) throw new UnauthorizedException('DATA_NOT_PROVIDED');
    const user = await this.authService.validateUser({ email, password });
    if (!user) throw new UnauthorizedException('INCORRECT_INPUT');
    // if (!user.emailVerified) throw new UnauthorizedException('EMAIL_NOT_VERIFIED');
    return user;
  }
}

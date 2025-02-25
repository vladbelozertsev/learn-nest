import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Token } from '../types/token.type';
import { UsersService } from 'src/Ω/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly $config: ConfigService,
    private readonly $users: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: $config.getOrThrow('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }
  async validate(req: Request, { id, iat }: Token) {
    const tokenEncodedReq = ExtractJwt.fromAuthHeaderAsBearerToken()(req)?.split('.')[2];
    const tokenEncodedDbHash = (await this.$users.findUser({ id }))?.refreshToken;
    if (!tokenEncodedDbHash) throw new UnauthorizedException('SESSION_EXPIRED');
    const isValid = await compare(tokenEncodedReq!, tokenEncodedDbHash);
    if (!isValid) throw new UnauthorizedException('INVALID_TOKEN');
    const time = this.$config.getOrThrow<number>('JWT_ACCESS_TOKEN_LIFE_TIME_S');
    if (Math.round(Date.now() / 1000) - iat > time) return { req };
    await this.$users.updateUserToken({ id, token: '' });
    throw new UnauthorizedException('SUSPICIOUS_ACTIVITY');
  }
}

// https://docs.nestjs.com/recipes/passport#request-scoped-strategies

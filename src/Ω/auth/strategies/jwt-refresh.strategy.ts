import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { Token } from '../types/token.type';
import { UsersService } from 'src/Ω/users/users.service';

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
  async validate(req: FastifyRequest, token: Token) {
    console.log('validate', token.email);
    const now = Math.round(Date.now() / 1000);
    const time = this.$config.getOrThrow('JWT_ACCESS_TOKEN_LIFE_TIME_S');
    const isAccessTokenExpired = now - token.iat > time;
    if (isAccessTokenExpired) return { req, refreshToken: token };
    await this.$users.updateUser({ data: { refreshToken: { set: '' } }, where: { id: token.id } });
    throw new UnauthorizedException('SUSPICIOUS_ACTIVITY');
  }
}

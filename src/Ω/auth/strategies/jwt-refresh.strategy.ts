import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
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
  async validate(req: FastifyRequest, { id, iat }: Token) {
    const tokenEncodedReq = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const tokenEncodedDbHash = (await this.$users.findUser({ id })).refreshToken;
    const isValid = await compare(tokenEncodedReq, tokenEncodedDbHash);
    if (!isValid) throw new UnauthorizedException('INVALID_TOKEN');
    const time = this.$config.getOrThrow('JWT_ACCESS_TOKEN_LIFE_TIME_S');
    const isAccessTokenExpired = Math.round(Date.now() / 1000) - iat > time;
    if (!isAccessTokenExpired) throw new UnauthorizedException('SUSPICIOUS_ACTIVITY');
    return { req };
  }
}

// https://docs.nestjs.com/recipes/passport#request-scoped-strategies

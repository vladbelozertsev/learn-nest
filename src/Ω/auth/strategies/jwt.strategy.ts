import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { Token } from '../types/token.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly $config: ConfigService,
    private readonly $jwt: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: $config.getOrThrow('JWT_ACCESS_SECRET'),
      passReqToCallback: true,
    });
  }
  async validate(req: FastifyRequest, token: Token) {
    return { req, accessToken: token };
  }
}

import * as Gql from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ExtractJwt } from 'passport-jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthRefreshGuard } from './guards/jwt-auth-refresh.guard';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginInput } from './schema/login.input';
import { LoginOutput } from './schema/login.output';
import { LogoutOutput } from './schema/logout.output';
import { Request } from 'express';
import { Token } from './types/token.type';
import { TokensOutput } from './schema/tokens.output';
import { UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { delkeys } from 'src/libs/utils/helpers';

@Gql.Resolver()
export class AuthResolver {
  constructor(
    private readonly $auth: AuthService,
    private readonly $users: UsersService,
    private readonly $jwt: JwtService,
  ) {}

  // LOGIN_STEP_#4
  @Gql.Mutation(() => LoginOutput)
  @UseGuards(LocalAuthGuard)
  async login(@Gql.Args('input') _: LoginInput, @Gql.Context() ctx) {
    const accessToken = this.$auth.getAccessToken(ctx.user);
    const refreshToken = this.$auth.getRefreshToken(ctx.user);

    await this.$users.updateUserToken({
      id: ctx.user.id,
      token: refreshToken,
    });

    return {
      user: delkeys(ctx.user, ['refreshToken', 'password']),
      refreshToken: refreshToken,
      accessToken,
    };
  }

  @Gql.Mutation(() => LogoutOutput)
  @UseGuards(JwtAuthGuard)
  logout(@Gql.Context() ctx: { req: Request }) {
    const tokenEncoded = ExtractJwt.fromAuthHeaderAsBearerToken()(ctx.req);
    const tokenDecoded = this.$jwt.decode(tokenEncoded) as Token;
    this.$users.updateUserToken({ id: tokenDecoded.id, token: '' });
    return { message: 'SUCCESS_LOGOUT' };
  }

  @Gql.Mutation(() => TokensOutput)
  @UseGuards(JwtAuthRefreshGuard)
  async refreshToken(@Gql.Context() ctx: { req: Request }) {
    const tokenEncoded = ExtractJwt.fromAuthHeaderAsBearerToken()(ctx.req);
    const tokenDecoded = this.$jwt.decode(tokenEncoded) as Token;
    const accessToken = this.$auth.getAccessToken(tokenDecoded);
    const refreshToken = this.$auth.getRefreshToken(tokenDecoded);

    await this.$users.updateUserToken({
      id: tokenDecoded.id,
      token: refreshToken,
    });

    return {
      refreshToken,
      accessToken,
    };
  }
}

import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ChangePasswordArgs } from './dto/change-password.args';
import { ExtractJwt } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthRefreshGuard } from './guards/jwt-auth-refresh.guard';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';
import { Token } from './types/token.type';
import { TokensOutput } from './dto/tokens.output';
import { UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { delkeys } from 'src/libs/utils/helpers';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly $auth: AuthService,
    private readonly $users: UsersService,
    private readonly $jwt: JwtService,
  ) {}

  // LOGIN_STEP_#4
  @Mutation(() => LoginOutput)
  @UseGuards(LocalAuthGuard)
  async login(@Args('input') _: LoginInput, @Context() ctx) {
    const accessToken = this.$auth.getAccessToken(ctx.user);
    const refreshToken = this.$auth.getRefreshToken(ctx.user);

    await this.$users.updateUserToken({
      data: { refreshToken },
      where: { id: ctx.user.id },
    });

    return {
      user: delkeys(ctx.user, ['refreshToken', 'password']),
      refreshToken: refreshToken,
      accessToken,
    };
  }

  @Mutation(() => TokensOutput)
  @UseGuards(JwtAuthRefreshGuard)
  async refreshToken(@Context() ctx: { req: FastifyRequest }) {
    const tokenEncoded = ExtractJwt.fromAuthHeaderAsBearerToken()(ctx.req);
    const tokenDecoded = this.$jwt.decode(tokenEncoded) as Token;
    const accessToken = this.$auth.getAccessToken(tokenDecoded);
    const refreshToken = this.$auth.getRefreshToken(tokenDecoded);

    await this.$users.updateUserToken({
      where: { id: tokenDecoded.id },
      data: { refreshToken },
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  @Mutation(() => TokensOutput)
  @UseGuards(JwtAuthGuard)
  async changePassword(@Args() { data, where }: ChangePasswordArgs) {
    const user = await this.$auth.validateUser({ where, password: data.password });
    const accessToken = this.$auth.getAccessToken(user);
    const refreshToken = this.$auth.getRefreshToken(user);

    await this.$users.updateUserPassword({
      data: { refreshToken, password: data.passwordUpd },
      where: { id: user.id },
    });

    return {
      refreshToken,
      accessToken,
    };
  }
}

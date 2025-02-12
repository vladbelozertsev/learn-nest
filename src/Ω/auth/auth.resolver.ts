import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginInput } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { delkeys } from 'src/libs/utils/helpers';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly $auth: AuthService,
    private readonly $users: UsersService,
  ) {}

  @Mutation(() => Auth)
  @UseGuards(LocalAuthGuard)
  // LOGIN_STEP_#4
  async login(@Args('input') _: LoginInput, @Context() ctx) {
    const refreshToken = this.$auth.getRefreshToken(ctx.user);
    const accessToken = this.$auth.getAccessToken(ctx.user);

    await this.$users.updateUser({
      data: { refreshToken: { set: refreshToken } },
      where: { id: ctx.user.id },
    });

    return {
      user: delkeys(ctx.user, ['refreshToken', 'password']),
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async refresh(_, @Context() ctx) {}
}

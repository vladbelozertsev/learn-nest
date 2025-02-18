import * as Gql from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { ExtractJwt } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { FindUniqueUserArgs } from 'src/libs/prisma/user/find-unique-user.args';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, TokensOutput } from 'src/Ω/auth';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/libs/services/mail/mail.service';
import { User } from 'src/libs/prisma/user/user.model';
import { UserInputCreate } from './dto/user-create.input';
import { UserUpdateInput } from 'src/libs/prisma/user/user-update.input';
import { UserUpdatePasswordInput } from './dto/update-user-password.input';
import { UsersService } from './users.service';
import { delkeys } from 'src/libs/utils/helpers';
import { randomBytes } from 'crypto';

@Gql.Resolver()
export class UsersResolver {
  constructor(
    private readonly $auth: AuthService,
    private readonly $users: UsersService,
    private readonly $jwt: JwtService,
    private readonly $mail: MailService,
  ) {}
  @Gql.Query(() => User)
  getUser(@Gql.Args() args: FindUniqueUserArgs) {
    return this.$users.findUser(args.where);
  }

  @Gql.Mutation(() => User)
  async createUser(@Gql.Args('input') input: UserInputCreate) {
    const reg = await this.$users.findUser({ email: input.email });
    if (reg) throw new HttpException('EMAIL_BUSY', HttpStatus.CONFLICT);
    const user = await this.$users.createUser(input);
    await this.$auth.verifyEmail(user);
    return delkeys(user, ['refreshToken', 'password']);
  }

  @Gql.Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Gql.Args('userUpdateInput') userUpdateInput: UserUpdateInput,
    @Gql.Context() ctx: { req: FastifyRequest },
  ) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(ctx.req);
    const where = { id: this.$jwt.decode(token).id };
    const user = await this.$users.updateUser({ where, data: userUpdateInput });
    if (!user) throw new HttpException('INCORRECT_USER_DATA', HttpStatus.UNPROCESSABLE_ENTITY);
    return delkeys(user, ['refreshToken', 'password']);
  }

  @Gql.Mutation(() => TokensOutput)
  @UseGuards(JwtAuthGuard)
  async updateUserPassword(
    @Gql.Args('input') input: UserUpdatePasswordInput,
    @Gql.Context() ctx: { req: FastifyRequest },
  ) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(ctx.req);
    const where = { id: this.$jwt.decode(token).id };

    const updateUserPassword = async (user: { id: number; password: string }) => {
      const accessToken = this.$auth.getAccessToken({ id: user.id });
      const refreshToken = this.$auth.getRefreshToken({ id: user.id });
      await this.$users.updateUserPassword({ ...user, refreshToken });
      return { refreshToken, accessToken };
    };

    if (!input.password || !input.passwordUpd) {
      const { email } = await this.$users.findUser(where);
      if (!email) throw new HttpException('INCORRECT_WHERE', HttpStatus.UNPROCESSABLE_ENTITY);
      const password = randomBytes(15).toString('base64');
      await this.$mail.resetPassword({ email, password });
      return updateUserPassword({ id: where.id, password });
    }

    const user = await this.$auth.validateUser({ where, password: input.password });
    if (!user) throw new HttpException('INCORRECT_WHERE', HttpStatus.UNPROCESSABLE_ENTITY);
    return updateUserPassword({ id: user.id, password: input.passwordUpd });
  }
}

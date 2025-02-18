import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/libs/services/mail/mail.service';
import { TokenPayload } from './types/token.type';
import { UpdateOneUserArgs } from 'src/libs/prisma/user/update-one-user.args';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { delkeys } from 'src/libs/utils/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly $users: UsersService,
    private readonly $jwt: JwtService,
    private readonly $config: ConfigService,
    private readonly $mail: MailService,
  ) {}
  getAccessToken(data: TokenPayload) {
    return this.$jwt.sign(
      { id: data.id },
      {
        secret: this.$config.getOrThrow('JWT_ACCESS_SECRET'),
        expiresIn: this.$config.getOrThrow('JWT_ACCESS_TOKEN_LIFE_TIME_S') + 's',
      },
    );
  }

  getRefreshToken(data: TokenPayload) {
    return this.$jwt.sign(
      { id: data.id },
      {
        secret: this.$config.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: this.$config.getOrThrow('JWT_REFRESH_TOKEN_LIFE_TIME_S') + 's',
      },
    );
  }

  getVerifyToken(data: TokenPayload) {
    return this.$jwt.sign(
      { id: data.id },
      {
        secret: this.$config.getOrThrow('JWT_VERIFY_EMAIL_SECRET'),
        expiresIn: this.$config.getOrThrow('JWT_VERIFY_EMAIL_TOKEN_LIFE_TIME_S') + 's',
      },
    );
  }

  async verifyEmail(data: { id: number; email: string }) {
    const token = this.getVerifyToken(data);
    const link = this.$config.getOrThrow('FRONTEND_URL') + 'api/auth/verify';
    return this.$mail.verifyEmail({ token, link, email: data.email });
  }

  // LOGIN_STEP_#3
  async validateUser(input: { where: UpdateOneUserArgs['where']; password: string }) {
    const user = await this.$users.findUser(input.where);
    if (!user) throw new UnauthorizedException('INCORRECT_EMAIL');
    const isValid = await compare(input.password, user.password);
    if (!isValid) throw new UnauthorizedException('INCORRECT_PASSWORD');
    return delkeys(user, ['password', 'refreshToken']);
  }
}

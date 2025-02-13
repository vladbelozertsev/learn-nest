import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  // LOGIN_STEP_#3
  async validateUser(input: { where: UpdateOneUserArgs['where']; password: string }) {
    const user = await this.$users.findUser(input.where);
    if (!user) throw new UnauthorizedException('INCORRECT_EMAIL');
    const isValid = await compare(input.password, user.password);
    if (!isValid) throw new UnauthorizedException('INCORRECT_PASSWORD');
    return delkeys(user, ['password', 'refreshToken']);
  }
}

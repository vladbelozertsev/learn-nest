import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { delkeys } from 'src/libs/utils/helpers';
import { TokenPayload } from './types/token.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly $users: UsersService,
    private readonly $jwt: JwtService,
    private readonly $config: ConfigService,
  ) {}
  getAccessToken(data: TokenPayload) {
    return this.$jwt.sign(
      { id: data.id, email: data.email },
      {
        secret: this.$config.getOrThrow('JWT_ACCESS_SECRET'),
        expiresIn: this.$config.getOrThrow('JWT_ACCESS_TOKEN_LIFE_TIME_S') + 's',
      },
    );
  }

  getRefreshToken(data: TokenPayload) {
    return this.$jwt.sign(
      { id: data.id, email: data.email },
      {
        secret: this.$config.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: this.$config.getOrThrow('JWT_REFRESH_TOKEN_LIFE_TIME_S') + 's',
      },
    );
  }

  // LOGIN_STEP_#3
  async validateUser({ email, password }: LoginInput) {
    const user = await this.$users.findUser({ email });
    if (!user || user.password !== password) return null;
    return delkeys(user, ['password']);
  }
}

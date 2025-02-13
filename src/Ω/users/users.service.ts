import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { UpdateOneUserArgs } from 'src/libs/prisma/user/update-one-user.args';
import { UpdateUserArgs } from './dto/update-user.args';
import { UpdateUserPasswordArgs } from './dto/update-user-password.args';
import { UpdateUserTokenArgs } from './dto/update-user-token.args';
import { UserCreateInput } from 'src/libs/prisma/user/user-create.input';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly $prisma: PrismaService) {}
  async createUser(input: UserCreateInput) {
    const password = await hash(input.password, 10);
    const data = { ...input, password };
    return this.$prisma.user.create({ data });
  }

  updateUser(data: UpdateUserArgs) {
    return this.$prisma.user.update(data);
  }

  async updateUserPassword({ where, data }: UpdateUserPasswordArgs) {
    const password = await hash(data.password, 10).then((set) => ({ set }));
    const refreshToken = await hash(data.refreshToken, 10).then((set) => ({ set }));
    return this.$prisma.user.update({ where, data: { password, refreshToken } });
  }

  async updateUserToken({ where, data }: UpdateUserTokenArgs) {
    const refreshToken = await hash(data.refreshToken, 10).then((set) => ({ set }));
    return this.$prisma.user.update({ where, data: { refreshToken } });
  }

  findUser(where: UpdateOneUserArgs['where']) {
    delete where['password'];
    return this.$prisma.user.findFirst({ where });
  }
}

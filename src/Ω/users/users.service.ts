import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { UpdateOneUserArgs } from 'src/libs/prisma/user/update-one-user.args';
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

  async updateUserPassword(inp: { id: number; password: string; refreshToken: string }) {
    const signature = inp.refreshToken.split('.')[2];
    const refreshToken = await hash(signature, 10).then((set) => ({ set }));
    const password = await hash(inp.password, 10).then((set) => ({ set }));
    return this.$prisma.user.update({ where: { id: inp.id }, data: { password, refreshToken } });
  }

  async updateUserToken({ id, token }: { id: number; token: string }) {
    const signature = token.split('.')[2];
    const remove = { refreshToken: { set: '' } };
    if (!signature) return this.$prisma.user.update({ where: { id }, data: remove });
    const refreshToken = await hash(signature, 10).then((set) => ({ set }));
    return this.$prisma.user.update({ where: { id }, data: { refreshToken } });
  }

  updateUser(data: UpdateOneUserArgs) {
    delete data['data']['email'];
    delete data['data']['emailVerified'];
    delete data['data']['password'];
    delete data['data']['refreshToken'];
    return this.$prisma.user.update(data);
  }

  findUser(where: UpdateOneUserArgs['where']) {
    delete where['password'];
    return this.$prisma.user.findFirst({ where });
  }
}

import { CreateUserInput } from './schema/create-user.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { UpdateUserInput } from './schema/update-user.input';
import { hash } from 'bcrypt';
import { wset } from 'src/libs/utils/helpers';

@Injectable()
export class UsersService {
  constructor(private readonly $prisma: PrismaService) {}
  async createUser(input: CreateUserInput) {
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

  updateUser(prams: { id: number; data: UpdateUserInput }) {
    const where = { id: prams.id };
    const data = wset(prams.data);
    return this.$prisma.user.update({ where, data });
  }

  findUser(prams: { id?: number; email?: string }) {
    const where = { id: prams.id, email: prams.email };
    return this.$prisma.user.findFirst({ where });
  }
}

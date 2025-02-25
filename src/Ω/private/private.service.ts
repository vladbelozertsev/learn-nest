import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';

@Injectable()
export class PrivateService {
  constructor(private readonly $prisma: PrismaService) {}

  async findFile(input: { userId: number; file: string }) {
    const find = { where: { name: input.file }, include: { users: true } };
    const file = await this.$prisma.privateFile.findUnique(find);
    const isConnected = file?.users?.find((u) => u.id === input.userId);
    return isConnected ? file : null;
  }

  async createFile(input: { userIds: number[]; file: string }) {
    const connect = input.userIds.map((id) => ({ id }));
    const data = { name: input.file, users: { connect } };
    return this.$prisma.privateFile.create({ data });
  }

  async connectUser(input: { userId: number; file: string }) {
    const where = { name: input.file };
    const data = { users: { connect: { id: input.userId } } };
    return this.$prisma.privateFile.update({ where, data });
  }

  async disconnectUser(input: { userId: number; file: string }) {
    const where = { name: input.file };
    const data = { users: { disconnect: { id: input.userId } } };
    return this.$prisma.privateFile.update({ where, data });
  }
}

import { FindUniqueUserArgs } from 'src/libs/prisma/user/find-unique-user.args';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { UpdateOneUserArgs } from 'src/libs/prisma/user/update-one-user.args';
import { UserCreateInput } from 'src/libs/prisma/user/user-create.input';

@Injectable()
export class UsersService {
  constructor(private readonly $prisma: PrismaService) {}

  findUser(where: FindUniqueUserArgs['where']) {
    delete where['password'];
    return this.$prisma.user.findFirst({ where });
  }

  updateUser(data: UpdateOneUserArgs) {
    return this.$prisma.user.update(data);
  }

  createUser(data: UserCreateInput) {
    return this.$prisma.user.create({ data });
  }
}

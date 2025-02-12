import { FindUniqueUserArgs } from 'src/libs/prisma/user/find-unique-user.args';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from 'src/libs/prisma/user/user.model';
import { UserCreateInput } from 'src/libs/prisma/user/user-create.input';
import { UsersService } from './users.service';
import { delkeys } from 'src/libs/utils/helpers';

@Resolver()
export class UsersResolver {
  constructor(private readonly $users: UsersService) {}
  @Query(() => User)
  getUser(@Args() args: FindUniqueUserArgs) {
    return this.$users.findUser(args.where);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserCreateInput) {
    const reg = await this.$users.findUser({ email: input.email });
    console.log(reg);
    if (reg) throw new HttpException('Forbidden', HttpStatus.CONFLICT);
    const user = await this.$users.createUser(input);
    return delkeys(user, ['refreshToken', 'password']);
  }
}

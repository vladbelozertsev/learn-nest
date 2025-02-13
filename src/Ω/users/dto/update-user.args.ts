import { ArgsType, Field, InputType, OmitType, PickType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UpdateOneUserArgs } from 'src/libs/prisma/user/update-one-user.args';
import { UserUpdateInput } from 'src/libs/prisma/user/user-update.input';

@InputType()
class UserInputUpdate extends PickType(UserUpdateInput, ['email', 'password']) {}

@ArgsType()
export class UpdateUserArgs extends OmitType(UpdateOneUserArgs, ['data']) {
  @Field(() => UserInputUpdate, { nullable: false })
  @Type(() => UserInputUpdate)
  data!: UserInputUpdate;
}

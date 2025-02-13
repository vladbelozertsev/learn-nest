import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UpdateOneUserArgs } from 'src/libs/prisma/user/update-one-user.args';

@InputType()
export class UserUpdatePasswordInput {
  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: false })
  refreshToken!: string;
}

@ArgsType()
export class UpdateUserPasswordArgs extends OmitType(UpdateOneUserArgs, ['data']) {
  @Field(() => UserUpdatePasswordInput, { nullable: false })
  @Type(() => UserUpdatePasswordInput)
  data!: UserUpdatePasswordInput;
}

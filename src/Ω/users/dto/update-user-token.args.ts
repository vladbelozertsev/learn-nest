import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UpdateOneUserArgs } from 'src/libs/prisma/user/update-one-user.args';

@InputType()
export class UserUpdateTokenInput {
  @Field(() => String, { nullable: false })
  refreshToken!: string;
}

@ArgsType()
export class UpdateUserTokenArgs extends OmitType(UpdateOneUserArgs, ['data']) {
  @Field(() => UserUpdateTokenInput, { nullable: false })
  @Type(() => UserUpdateTokenInput)
  data!: UserUpdateTokenInput;
}

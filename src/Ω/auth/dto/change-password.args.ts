import { ArgsType, Field, InputType, PickType } from '@nestjs/graphql';
import { UpdateOneUserArgs } from 'src/libs/prisma/user/update-one-user.args';
import { Type } from 'class-transformer';

@InputType()
class ChangePasswordInput {
  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: false })
  passwordUpd!: string;
}

@ArgsType()
export class ChangePasswordArgs extends PickType(UpdateOneUserArgs, ['where']) {
  @Field(() => ChangePasswordInput, { nullable: false })
  @Type(() => ChangePasswordInput)
  data!: ChangePasswordInput;
}

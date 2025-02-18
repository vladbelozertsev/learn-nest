import * as V from 'class-validator';
import { Field, InputType, OmitType } from '@nestjs/graphql';
import { UserCreateInput } from 'src/libs/prisma/user/user-create.input';

@InputType()
export class UserInputCreate extends OmitType(UserCreateInput, ['password', 'email']) {
  @Field(() => String, { nullable: false })
  @V.MinLength(6)
  @V.MaxLength(72)
  @V.IsNotEmpty()
  password!: string;

  @Field(() => String, { nullable: false })
  @V.IsEmail()
  @V.IsNotEmpty()
  email!: string;
}

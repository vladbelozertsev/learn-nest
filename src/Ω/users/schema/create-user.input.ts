import * as V from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  @V.MinLength(6)
  @V.MaxLength(72)
  @V.IsNotEmpty()
  password!: string;

  @Field(() => String, { nullable: false })
  @V.IsEmail()
  @V.IsNotEmpty()
  email!: string;

  @Field(() => String, { nullable: false })
  @V.IsNotEmpty()
  name!: string;
}

import * as Gql from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@Gql.InputType()
export class UserUpdatePasswordInput {
  @Gql.Field(() => String, { nullable: true })
  password?: string;

  @Gql.Field(() => String, { nullable: true })
  @MinLength(6)
  @MaxLength(72)
  passwordUpd?: string;
}

import * as Gql from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@Gql.InputType()
export class UpdateUserPasswordInput {
  @Gql.Field(() => String, { nullable: true })
  password?: string;

  @Gql.Field(() => String, { nullable: true })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(72)
  passwordUpd?: string;
}

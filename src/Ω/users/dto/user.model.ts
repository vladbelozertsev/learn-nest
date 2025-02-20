import { Field, HideField } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => Boolean, { defaultValue: false, nullable: false })
  emailVerified!: boolean;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @HideField()
  role!: string;

  @HideField()
  password!: string;

  @HideField()
  refreshToken!: string;
}

import { Field, HideField, Int } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { PrivateFile } from './private-file.model';

@ObjectType()
export class UserCount {
  @Field(() => Int, { nullable: false })
  files?: number;
}

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => Boolean, { defaultValue: false, nullable: false })
  emailVerified!: boolean;

  @Field(() => [PrivateFile], { nullable: true })
  files?: Array<PrivateFile>;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;

  @HideField()
  role!: string;

  @HideField()
  password!: string;

  @HideField()
  refreshToken!: string;
}

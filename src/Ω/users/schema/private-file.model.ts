import { Field, Int } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class PrivateFileCount {
  @Field(() => Int, { nullable: false })
  access?: number;
}

@ObjectType()
export class PrivateFile {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => [User], { nullable: true })
  access?: Array<User>;

  @Field(() => PrivateFileCount, { nullable: false })
  _count?: PrivateFileCount;
}

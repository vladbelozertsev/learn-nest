import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { PrivateFileCount } from './private-file-count.output';

@ObjectType()
export class PrivateFile {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [User], {nullable:true})
    users?: Array<User>;

    @Field(() => PrivateFileCount, {nullable:false})
    _count?: PrivateFileCount;
}

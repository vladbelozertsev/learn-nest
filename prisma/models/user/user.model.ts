import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { PrivateFile } from '../private-file/private-file.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => Boolean, {defaultValue:false,nullable:false})
    emailVerified!: boolean;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => String, {defaultValue:'',nullable:false})
    refreshToken!: string;

    @Field(() => String, {defaultValue:'user',nullable:false})
    role!: string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => [PrivateFile], {nullable:true})
    files?: Array<PrivateFile>;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}

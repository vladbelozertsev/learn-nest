import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as V from 'class-validator';
import { HideField } from '@nestjs/graphql';

@InputType()
export class UserCreateInput {

    @Field(() => String, {nullable:false})
    @V.IsEmail()
    email!: string;

    @HideField()
    emailVerified?: boolean;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @HideField()
    refreshToken?: string;

    @HideField()
    createdAt?: Date | string;

    @HideField()
    updatedAt?: Date | string;
}

import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class UserUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @HideField()
    email!: string;

    @HideField()
    emailVerified?: boolean;

    @HideField()
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

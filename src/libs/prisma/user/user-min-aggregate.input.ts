import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class UserMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @HideField()
    email?: true;

    @HideField()
    emailVerified?: true;

    @HideField()
    password?: true;

    @Field(() => Boolean, {nullable:true})
    name?: true;

    @HideField()
    role?: true;

    @HideField()
    refreshToken?: true;

    @HideField()
    createdAt?: true;

    @HideField()
    updatedAt?: true;
}

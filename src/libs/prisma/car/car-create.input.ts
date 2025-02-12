import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class CarCreateInput {

    @Field(() => String, {nullable:false})
    brand!: string;

    @Field(() => String, {nullable:false})
    model!: string;

    @Field(() => String, {nullable:false})
    color!: string;

    @Field(() => Float, {nullable:false})
    price!: number;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

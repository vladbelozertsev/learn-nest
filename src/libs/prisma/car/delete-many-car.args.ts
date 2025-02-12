import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CarWhereInput } from './car-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyCarArgs {

    @Field(() => CarWhereInput, {nullable:true})
    @Type(() => CarWhereInput)
    where?: CarWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}

import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FlowerWhereInput } from './flower-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyFlowerArgs {

    @Field(() => FlowerWhereInput, {nullable:true})
    @Type(() => FlowerWhereInput)
    where?: FlowerWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}

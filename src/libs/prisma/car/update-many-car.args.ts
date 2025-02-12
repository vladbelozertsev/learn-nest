import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CarUpdateManyMutationInput } from './car-update-many-mutation.input';
import { Type } from 'class-transformer';
import { CarWhereInput } from './car-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyCarArgs {

    @Field(() => CarUpdateManyMutationInput, {nullable:false})
    @Type(() => CarUpdateManyMutationInput)
    data!: CarUpdateManyMutationInput;

    @Field(() => CarWhereInput, {nullable:true})
    @Type(() => CarWhereInput)
    where?: CarWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}

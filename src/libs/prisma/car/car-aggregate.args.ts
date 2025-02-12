import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CarWhereInput } from './car-where.input';
import { Type } from 'class-transformer';
import { CarOrderByWithRelationInput } from './car-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CarWhereUniqueInput } from './car-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CarCountAggregateInput } from './car-count-aggregate.input';
import { CarAvgAggregateInput } from './car-avg-aggregate.input';
import { CarSumAggregateInput } from './car-sum-aggregate.input';
import { CarMinAggregateInput } from './car-min-aggregate.input';
import { CarMaxAggregateInput } from './car-max-aggregate.input';

@ArgsType()
export class CarAggregateArgs {

    @Field(() => CarWhereInput, {nullable:true})
    @Type(() => CarWhereInput)
    where?: CarWhereInput;

    @Field(() => [CarOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<CarOrderByWithRelationInput>;

    @Field(() => CarWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<CarWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => CarCountAggregateInput, {nullable:true})
    _count?: CarCountAggregateInput;

    @Field(() => CarAvgAggregateInput, {nullable:true})
    _avg?: CarAvgAggregateInput;

    @Field(() => CarSumAggregateInput, {nullable:true})
    _sum?: CarSumAggregateInput;

    @Field(() => CarMinAggregateInput, {nullable:true})
    _min?: CarMinAggregateInput;

    @Field(() => CarMaxAggregateInput, {nullable:true})
    _max?: CarMaxAggregateInput;
}

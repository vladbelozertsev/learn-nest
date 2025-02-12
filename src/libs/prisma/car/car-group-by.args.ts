import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CarWhereInput } from './car-where.input';
import { Type } from 'class-transformer';
import { CarOrderByWithAggregationInput } from './car-order-by-with-aggregation.input';
import { CarScalarFieldEnum } from './car-scalar-field.enum';
import { CarScalarWhereWithAggregatesInput } from './car-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { CarCountAggregateInput } from './car-count-aggregate.input';
import { CarAvgAggregateInput } from './car-avg-aggregate.input';
import { CarSumAggregateInput } from './car-sum-aggregate.input';
import { CarMinAggregateInput } from './car-min-aggregate.input';
import { CarMaxAggregateInput } from './car-max-aggregate.input';

@ArgsType()
export class CarGroupByArgs {

    @Field(() => CarWhereInput, {nullable:true})
    @Type(() => CarWhereInput)
    where?: CarWhereInput;

    @Field(() => [CarOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<CarOrderByWithAggregationInput>;

    @Field(() => [CarScalarFieldEnum], {nullable:false})
    by!: Array<`${CarScalarFieldEnum}`>;

    @Field(() => CarScalarWhereWithAggregatesInput, {nullable:true})
    having?: CarScalarWhereWithAggregatesInput;

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

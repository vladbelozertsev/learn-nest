import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FlowerWhereInput } from './flower-where.input';
import { Type } from 'class-transformer';
import { FlowerOrderByWithAggregationInput } from './flower-order-by-with-aggregation.input';
import { FlowerScalarFieldEnum } from './flower-scalar-field.enum';
import { FlowerScalarWhereWithAggregatesInput } from './flower-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { FlowerCountAggregateInput } from './flower-count-aggregate.input';
import { FlowerAvgAggregateInput } from './flower-avg-aggregate.input';
import { FlowerSumAggregateInput } from './flower-sum-aggregate.input';
import { FlowerMinAggregateInput } from './flower-min-aggregate.input';
import { FlowerMaxAggregateInput } from './flower-max-aggregate.input';

@ArgsType()
export class FlowerGroupByArgs {

    @Field(() => FlowerWhereInput, {nullable:true})
    @Type(() => FlowerWhereInput)
    where?: FlowerWhereInput;

    @Field(() => [FlowerOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<FlowerOrderByWithAggregationInput>;

    @Field(() => [FlowerScalarFieldEnum], {nullable:false})
    by!: Array<`${FlowerScalarFieldEnum}`>;

    @Field(() => FlowerScalarWhereWithAggregatesInput, {nullable:true})
    having?: FlowerScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => FlowerCountAggregateInput, {nullable:true})
    _count?: FlowerCountAggregateInput;

    @Field(() => FlowerAvgAggregateInput, {nullable:true})
    _avg?: FlowerAvgAggregateInput;

    @Field(() => FlowerSumAggregateInput, {nullable:true})
    _sum?: FlowerSumAggregateInput;

    @Field(() => FlowerMinAggregateInput, {nullable:true})
    _min?: FlowerMinAggregateInput;

    @Field(() => FlowerMaxAggregateInput, {nullable:true})
    _max?: FlowerMaxAggregateInput;
}

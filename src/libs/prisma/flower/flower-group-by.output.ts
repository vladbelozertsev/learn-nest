import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { FlowerCountAggregate } from './flower-count-aggregate.output';
import { FlowerAvgAggregate } from './flower-avg-aggregate.output';
import { FlowerSumAggregate } from './flower-sum-aggregate.output';
import { FlowerMinAggregate } from './flower-min-aggregate.output';
import { FlowerMaxAggregate } from './flower-max-aggregate.output';

@ObjectType()
export class FlowerGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:false})
    color!: string;

    @Field(() => Float, {nullable:false})
    price!: number;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => FlowerCountAggregate, {nullable:true})
    _count?: FlowerCountAggregate;

    @Field(() => FlowerAvgAggregate, {nullable:true})
    _avg?: FlowerAvgAggregate;

    @Field(() => FlowerSumAggregate, {nullable:true})
    _sum?: FlowerSumAggregate;

    @Field(() => FlowerMinAggregate, {nullable:true})
    _min?: FlowerMinAggregate;

    @Field(() => FlowerMaxAggregate, {nullable:true})
    _max?: FlowerMaxAggregate;
}

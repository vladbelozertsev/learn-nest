import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { FlowerCountAggregate } from './flower-count-aggregate.output';
import { FlowerAvgAggregate } from './flower-avg-aggregate.output';
import { FlowerSumAggregate } from './flower-sum-aggregate.output';
import { FlowerMinAggregate } from './flower-min-aggregate.output';
import { FlowerMaxAggregate } from './flower-max-aggregate.output';

@ObjectType()
export class AggregateFlower {

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

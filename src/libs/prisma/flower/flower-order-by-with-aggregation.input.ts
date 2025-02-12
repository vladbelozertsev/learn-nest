import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { FlowerCountOrderByAggregateInput } from './flower-count-order-by-aggregate.input';
import { FlowerAvgOrderByAggregateInput } from './flower-avg-order-by-aggregate.input';
import { FlowerMaxOrderByAggregateInput } from './flower-max-order-by-aggregate.input';
import { FlowerMinOrderByAggregateInput } from './flower-min-order-by-aggregate.input';
import { FlowerSumOrderByAggregateInput } from './flower-sum-order-by-aggregate.input';

@InputType()
export class FlowerOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    color?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    price?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;

    @Field(() => FlowerCountOrderByAggregateInput, {nullable:true})
    _count?: FlowerCountOrderByAggregateInput;

    @Field(() => FlowerAvgOrderByAggregateInput, {nullable:true})
    _avg?: FlowerAvgOrderByAggregateInput;

    @Field(() => FlowerMaxOrderByAggregateInput, {nullable:true})
    _max?: FlowerMaxOrderByAggregateInput;

    @Field(() => FlowerMinOrderByAggregateInput, {nullable:true})
    _min?: FlowerMinOrderByAggregateInput;

    @Field(() => FlowerSumOrderByAggregateInput, {nullable:true})
    _sum?: FlowerSumOrderByAggregateInput;
}

import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';

@InputType()
export class UserCountOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @HideField()
    email?: `${SortOrder}`;

    @HideField()
    emailVerified?: `${SortOrder}`;

    @HideField()
    password?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;

    @HideField()
    refreshToken?: `${SortOrder}`;

    @HideField()
    createdAt?: `${SortOrder}`;

    @HideField()
    updatedAt?: `${SortOrder}`;
}

import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { FlowerWhereInput } from './flower-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class FlowerWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [FlowerWhereInput], {nullable:true})
    AND?: Array<FlowerWhereInput>;

    @Field(() => [FlowerWhereInput], {nullable:true})
    OR?: Array<FlowerWhereInput>;

    @Field(() => [FlowerWhereInput], {nullable:true})
    NOT?: Array<FlowerWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    color?: StringFilter;

    @Field(() => FloatFilter, {nullable:true})
    price?: FloatFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}

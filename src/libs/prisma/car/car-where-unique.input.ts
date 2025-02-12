import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CarWhereInput } from './car-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class CarWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [CarWhereInput], {nullable:true})
    AND?: Array<CarWhereInput>;

    @Field(() => [CarWhereInput], {nullable:true})
    OR?: Array<CarWhereInput>;

    @Field(() => [CarWhereInput], {nullable:true})
    NOT?: Array<CarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    brand?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    model?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    color?: StringFilter;

    @Field(() => FloatFilter, {nullable:true})
    price?: FloatFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}

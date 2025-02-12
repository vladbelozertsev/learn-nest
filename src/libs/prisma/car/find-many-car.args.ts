import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CarWhereInput } from './car-where.input';
import { Type } from 'class-transformer';
import { CarOrderByWithRelationInput } from './car-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CarWhereUniqueInput } from './car-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CarScalarFieldEnum } from './car-scalar-field.enum';

@ArgsType()
export class FindManyCarArgs {

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

    @Field(() => [CarScalarFieldEnum], {nullable:true})
    distinct?: Array<`${CarScalarFieldEnum}`>;
}

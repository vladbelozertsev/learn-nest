import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FlowerWhereInput } from './flower-where.input';
import { Type } from 'class-transformer';
import { FlowerOrderByWithRelationInput } from './flower-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { FlowerWhereUniqueInput } from './flower-where-unique.input';
import { Int } from '@nestjs/graphql';
import { FlowerScalarFieldEnum } from './flower-scalar-field.enum';

@ArgsType()
export class FindFirstFlowerOrThrowArgs {

    @Field(() => FlowerWhereInput, {nullable:true})
    @Type(() => FlowerWhereInput)
    where?: FlowerWhereInput;

    @Field(() => [FlowerOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<FlowerOrderByWithRelationInput>;

    @Field(() => FlowerWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<FlowerWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [FlowerScalarFieldEnum], {nullable:true})
    distinct?: Array<`${FlowerScalarFieldEnum}`>;
}

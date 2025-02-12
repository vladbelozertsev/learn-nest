import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { FlowerWhereUniqueInput } from './flower-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueFlowerArgs {

    @Field(() => FlowerWhereUniqueInput, {nullable:false})
    @Type(() => FlowerWhereUniqueInput)
    where!: Prisma.AtLeast<FlowerWhereUniqueInput, 'id'>;
}

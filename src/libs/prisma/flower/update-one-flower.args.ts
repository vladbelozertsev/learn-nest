import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FlowerUpdateInput } from './flower-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { FlowerWhereUniqueInput } from './flower-where-unique.input';

@ArgsType()
export class UpdateOneFlowerArgs {

    @Field(() => FlowerUpdateInput, {nullable:false})
    @Type(() => FlowerUpdateInput)
    data!: FlowerUpdateInput;

    @Field(() => FlowerWhereUniqueInput, {nullable:false})
    @Type(() => FlowerWhereUniqueInput)
    where!: Prisma.AtLeast<FlowerWhereUniqueInput, 'id'>;
}

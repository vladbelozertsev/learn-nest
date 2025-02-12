import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { FlowerWhereUniqueInput } from './flower-where-unique.input';
import { Type } from 'class-transformer';
import { FlowerCreateInput } from './flower-create.input';
import { FlowerUpdateInput } from './flower-update.input';

@ArgsType()
export class UpsertOneFlowerArgs {

    @Field(() => FlowerWhereUniqueInput, {nullable:false})
    @Type(() => FlowerWhereUniqueInput)
    where!: Prisma.AtLeast<FlowerWhereUniqueInput, 'id'>;

    @Field(() => FlowerCreateInput, {nullable:false})
    @Type(() => FlowerCreateInput)
    create!: FlowerCreateInput;

    @Field(() => FlowerUpdateInput, {nullable:false})
    @Type(() => FlowerUpdateInput)
    update!: FlowerUpdateInput;
}

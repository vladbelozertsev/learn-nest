import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CarWhereUniqueInput } from './car-where-unique.input';
import { Type } from 'class-transformer';
import { CarCreateInput } from './car-create.input';
import { CarUpdateInput } from './car-update.input';

@ArgsType()
export class UpsertOneCarArgs {

    @Field(() => CarWhereUniqueInput, {nullable:false})
    @Type(() => CarWhereUniqueInput)
    where!: Prisma.AtLeast<CarWhereUniqueInput, 'id'>;

    @Field(() => CarCreateInput, {nullable:false})
    @Type(() => CarCreateInput)
    create!: CarCreateInput;

    @Field(() => CarUpdateInput, {nullable:false})
    @Type(() => CarUpdateInput)
    update!: CarUpdateInput;
}

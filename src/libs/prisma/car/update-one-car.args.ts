import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CarUpdateInput } from './car-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { CarWhereUniqueInput } from './car-where-unique.input';

@ArgsType()
export class UpdateOneCarArgs {

    @Field(() => CarUpdateInput, {nullable:false})
    @Type(() => CarUpdateInput)
    data!: CarUpdateInput;

    @Field(() => CarWhereUniqueInput, {nullable:false})
    @Type(() => CarWhereUniqueInput)
    where!: Prisma.AtLeast<CarWhereUniqueInput, 'id'>;
}

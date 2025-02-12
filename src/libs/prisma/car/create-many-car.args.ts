import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CarCreateManyInput } from './car-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyCarArgs {

    @Field(() => [CarCreateManyInput], {nullable:false})
    @Type(() => CarCreateManyInput)
    data!: Array<CarCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

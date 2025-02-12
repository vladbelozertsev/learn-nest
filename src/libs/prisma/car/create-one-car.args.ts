import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CarCreateInput } from './car-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneCarArgs {

    @Field(() => CarCreateInput, {nullable:false})
    @Type(() => CarCreateInput)
    data!: CarCreateInput;
}

import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FlowerCreateInput } from './flower-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneFlowerArgs {

    @Field(() => FlowerCreateInput, {nullable:false})
    @Type(() => FlowerCreateInput)
    data!: FlowerCreateInput;
}

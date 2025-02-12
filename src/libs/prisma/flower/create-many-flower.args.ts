import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FlowerCreateManyInput } from './flower-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyFlowerArgs {

    @Field(() => [FlowerCreateManyInput], {nullable:false})
    @Type(() => FlowerCreateManyInput)
    data!: Array<FlowerCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

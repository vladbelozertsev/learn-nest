import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { FlowerUpdateManyMutationInput } from './flower-update-many-mutation.input';
import { Type } from 'class-transformer';
import { FlowerWhereInput } from './flower-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyFlowerArgs {

    @Field(() => FlowerUpdateManyMutationInput, {nullable:false})
    @Type(() => FlowerUpdateManyMutationInput)
    data!: FlowerUpdateManyMutationInput;

    @Field(() => FlowerWhereInput, {nullable:true})
    @Type(() => FlowerWhereInput)
    where?: FlowerWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}

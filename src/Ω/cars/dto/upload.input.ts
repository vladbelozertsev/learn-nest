import { Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-ts';
import { InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FileInput {
  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<{
    uri: string;
    name: string;
    type: string;
  }>;
}

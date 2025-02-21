import { Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FileInput {
  @Field(() => GraphQLUpload, { nullable: true })
  @IsOptional()
  file?: Promise<FileUpload>;
}

@InputType()
export class FilesInput {
  @Field(() => [GraphQLUpload], { nullable: true })
  files?: [Promise<FileUpload>]; // [FileInput!]!
}

/**
 * Useful links:
 * https://www.reddit.com/r/graphql/comments/18qd3a5/multiple_images_upload/
 **/

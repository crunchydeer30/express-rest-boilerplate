import { IsNotEmpty, Length, IsString, IsOptional } from 'class-validator';
import { TransformFnParams, Transform } from 'class-transformer';

import {
  JSONSchema,
  validationMetadatasToSchemas
} from 'class-validator-jsonschema';

import { Post } from '@prisma/client';

import { RequestSchema } from '../middleware/validate';
import { PaginationQuery } from './pagination.validators';

import { DEFAULT_POST_CONTENT, DEFAULT_POST_TITLE } from '../docs/defaults';

export class PostCreatePayload implements Omit<Post, 'id' | 'createdAt'> {
  @JSONSchema({
    default: DEFAULT_POST_TITLE
  })
  @IsString()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Transform(({ value }: TransformFnParams) => value?.trim() as string)
  @Length(5, 75)
  title!: string;

  @JSONSchema({
    default: DEFAULT_POST_CONTENT
  })
  @IsString()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Transform(({ value }: TransformFnParams) => value?.trim() as string)
  @Length(10, 2500)
  content!: string;
}

export class PostQuery extends PaginationQuery {
  @JSONSchema({
    description:
      'Search post by title. The search is case-insensitive. Search works by finding a substring in a title.'
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  q?: string;
}

export class PostPatchPayload {
  @JSONSchema({
    default: DEFAULT_POST_TITLE
  })
  @IsString()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Transform(({ value }: TransformFnParams) => value?.trim() as string)
  @Length(5, 75)
  title?: string;

  @JSONSchema({
    default: DEFAULT_POST_CONTENT
  })
  @IsString()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Transform(({ value }: TransformFnParams) => value?.trim() as string)
  @Length(10, 2500)
  content?: string;
}

export const CreatePostSchema: RequestSchema = {
  body: PostCreatePayload
};

export const GetPostsSchema: RequestSchema = {
  query: PostQuery
};

export const PatchPostSchema: RequestSchema = {
  body: PostPatchPayload
};

export const PostSchemas = validationMetadatasToSchemas();

import prisma from '../config/prisma';
import createHttpError from 'http-errors';

import { Post } from '@prisma/client';
import {
  PostCreatePayload,
  PostQuery,
  PostPatchPayload
} from '../validators/post.validators';
import { buildPaginationQuery } from '../validators/pagination.validators';

const buildPostsQuery = (query: PostQuery) => {
  const { q } = query;

  const filters = [];

  if (q) filters.push({ title: { contains: q, mode: 'insensitive' as const } });

  return filters;
};

const getAll = async (query: PostQuery): Promise<Post[]> => {
  const paginationOptions = buildPaginationQuery(query);
  const filters = buildPostsQuery(query);

  const posts = await prisma.post.findMany({
    where: {
      AND: filters
    },
    ...paginationOptions,
    orderBy: {
      createdAt: 'desc'
    }
  });
  return posts;
};

const getById = async (id: string): Promise<Post> => {
  const post = await prisma.post.findUnique({
    where: {
      id
    }
  });

  if (!post) {
    throw new createHttpError.NotFound('Post not found');
  }

  return post;
};

const create = async (data: PostCreatePayload): Promise<Post> => {
  const post = await prisma.post.create({
    data
  });

  return post;
};

const update = async (id: string, data: PostPatchPayload): Promise<Post> => {
  const post = await getById(id);

  if (!post) {
    throw new createHttpError.NotFound('Post not found');
  }

  const updatedPost = await prisma.post.update({
    where: {
      id
    },
    data
  });
  return updatedPost;
};

const remove = async (id: string): Promise<void> => {
  const post = await getById(id);

  await prisma.post.delete({
    where: {
      id: post.id
    }
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  remove
};

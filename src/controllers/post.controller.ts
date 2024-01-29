import { Request, Response, NextFunction } from 'express';
import postService from '../services/post.service';
import {
  PostCreatePayload,
  PostPatchPayload
} from '../validators/post.validators';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.summary = 'Posts'
    #swagger.description = 
      '<p>This endpoint allows the client to retrieve a list of articles.</p> 
      <p>By default it will return featured, published articles ordered by descending date of creation.</p>
    '
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: "#/components/schemas/Post" }
    }
    #swagger.parameters['query parameters'] = {
      in: 'query',
      description: 'query parameters',
      schema: { $ref: "#/components/schemas/PostQuery" }
    }
  */

  try {
    const { query } = req;
    const posts = await postService.getAll(query);
    res.status(200).json(posts);
  } catch (e) {
    next(e);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.summary = 'Get post by id'
    #swagger.description = 'Get post by id'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: "#/components/schemas/Post" }
    }
  */

  try {
    const { id } = req.params;
    const post = await postService.getById(id);
    return res.status(200).json(post);
  } catch (e) {
    return next(e);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.summary = 'Create post'
    #swagger.description = 'This endpoint allows the client to create a new post.'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/PostCreatePayload" }
    }
    #swagger.responses[201] = {
      description: 'OK',
      schema: { $ref: "#/components/schemas/Post" }
    }
  */

  try {
    const post = await postService.create(req.body as PostCreatePayload);
    res.status(201).json(post);
  } catch (e) {
    next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.summary = 'Edit post'
    #swagger.description = 
      '<p>This endpoint allows the client to edit a post.</p>
      <p>It's possible to change the title and content of the post.</p>'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/PostPatchPayload" }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: "#/components/schemas/Post" }
    }
    #swagger.responses[404] = {
      description: 'Post not found'
    }
  */

  try {
    const { id } = req.params;
    const post = await postService.update(id, req.body as PostPatchPayload);
    res.status(200).json(post);
  } catch (e) {
    next(e);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.summary = 'Delete post'
    #swagger.description = 'This endpoint allows the client to delete a post.'
    #swagger.parameters['id'] = {
      required: true, 
    }
    #swagger.responses[404] = {
      description: 'Post not found'
    }
  */

  try {
    const { id } = req.params;
    await postService.remove(id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove
};

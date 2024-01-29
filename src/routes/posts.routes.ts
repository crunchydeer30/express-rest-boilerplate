/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import postController from '../controllers/post.controller';
import { validate } from '../middleware/validate';
import {
  CreatePostSchema,
  GetPostsSchema
} from '../validators/post.validators';

const postRouter = Router();

postRouter.get('/', validate(GetPostsSchema), postController.getAll);

postRouter.get('/:id', postController.getById);

postRouter.post('/', validate(CreatePostSchema), postController.create);

postRouter.patch('/:id', validate(CreatePostSchema), postController.update);

postRouter.delete('/:id', postController.remove);

export default postRouter;

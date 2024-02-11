import { Router } from 'express';

import healthCheckRouter from './routes/healthcheck.routes';
import postRouter from './routes/posts.routes';

const apiRouter = Router();

apiRouter.use('/healthcheck', healthCheckRouter);
apiRouter.use('/posts', postRouter);

export default apiRouter;

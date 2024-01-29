import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import errorHandler from './middleware/errorHandler';
import rateLimiter from './middleware/rateLimiter';

import postRouter from './routes/posts.routes';
import healthCheckRouter from './routes/healthcheck.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));
app.use(rateLimiter);

app.use('/api/posts', postRouter);
app.use('/api/healthcheck', healthCheckRouter);

app.use(errorHandler);

export default app;

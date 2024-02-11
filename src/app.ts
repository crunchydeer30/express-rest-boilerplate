import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import errorHandler from './middleware/errorHandler';
import rateLimiter from './middleware/rateLimiter';

import apiRouter from './router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));
app.use(rateLimiter);

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;

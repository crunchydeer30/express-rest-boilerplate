import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import apiRouter from './router';
import expressWinston from 'express-winston';
import { consoleLogger, fileLogger, errorLogger } from './logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  expressWinston.logger({
    winstonInstance: consoleLogger,
    meta: false,
    expressFormat: true,
    colorize: true,
  }),
);
app.use(
  expressWinston.logger({
    winstonInstance: fileLogger,
    meta: true,
    responseWhitelist: ['body', 'statusCode', 'headers'],
  }),
);

app.use('/api', apiRouter);

app.use(
  expressWinston.errorLogger({
    winstonInstance: errorLogger,
  }),
);
app.use(errorHandler);

export default app;

import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import env from './config/env';

export const consoleLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli()),
      level: 'info',
    }),
  ],
});

export const fileLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
    winston.format.combine(winston.format.json()),
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'info',
    }),
    new ElasticsearchTransport({
      clientOpts: {
        node: env.ELASTICSEARCH_HOSTS || 'http://elasticsearch:9200',
      },
      indexPrefix: 'server-logs',
    }),
  ],
});

export const errorLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  ),
  level: 'error',
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      format: winston.format.combine(winston.format.json()),
    }),
    new ElasticsearchTransport({
      clientOpts: {
        node: env.ELASTICSEARCH_HOSTS || 'http://elasticsearch:9200',
      },
      indexPrefix: 'server-errors',
    }),
  ],
});

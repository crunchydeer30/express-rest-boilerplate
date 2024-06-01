import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error);

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json(error);
  }

  return res.status(500).json({
    code: 500,
    message: 'Internal server error',
  });
};

export default errorHandler;

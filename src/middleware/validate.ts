import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate =
  (schema: z.AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body as object,
        query: req.query as object,
        params: req.params as object,
      });
      return next();
    } catch (e: unknown) {
      return next(e);
    }
  };

export default validate;

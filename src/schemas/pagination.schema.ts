import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const paginationParams = z.object({
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).max(100).default(30).optional(),
});

export type PaginationParams = z.infer<typeof paginationParams>;
export const PaginationSchemas = zodToJsonSchema(paginationParams);

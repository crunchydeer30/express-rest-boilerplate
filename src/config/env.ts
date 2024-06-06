import { z } from 'zod';
import dotenv from 'dotenv';
import { consoleLogger } from '../logger';
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string(),
});

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
};

try {
  envSchema.parse(env);
} catch (err) {
  console.error('❌ Invalid environment variables ❌');
  // @ts-expect-error error
  consoleLogger.error(err.message);
  process.exit(1);
}

export default env;

import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};

try {
  envSchema.parse(env);
} catch (err) {
  console.log('❌ Invalid environment variables');
  // @ts-expect-error error
  console.error(err.message);
  process.exit(1);
}

export default env;

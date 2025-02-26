import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3333),
    MONGODB_URI: z.coerce.string().default('mongodb://localhost:27018'),
    JWT_SECRET: z.coerce.string().default('secret'),
    NODE_ENV: z.coerce.string().default('development')
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.SERVER_PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
});

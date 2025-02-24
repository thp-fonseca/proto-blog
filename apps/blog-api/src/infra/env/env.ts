import { env } from '@workspace/env'

export const environment = {
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  MONGODB_URI: env.MONGODB_URI,
  JWT_SECRET: env.JWT_SECRET,
}

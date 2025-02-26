export const environment = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: process.env.PORT ? Number(process.env.PORT) : 3333,
  MONGODB_URI: process.env.MONGODB_URI ?? (() => { throw new Error("MONGODB_URI is required"); })(),
  JWT_SECRET: process.env.JWT_SECRET ?? (() => { throw new Error("JWT_SECRET is required"); })(),
} as const;
// types.d.ts
declare const env: {
    PORT: number
    MONGODB_URI: string
    JWT_SECRET: string
    NEXT_PUBLIC_API_URL: string
    NODE_ENV: string | undefined
}

export { env }

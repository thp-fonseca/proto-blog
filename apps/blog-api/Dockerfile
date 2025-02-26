FROM node:20.9-slim AS base

FROM base AS builder

WORKDIR /app

RUN yarn global add turbo@latest &&\
    yarn global add pnpm

COPY . .

RUN pnpm install && turbo build --filter=blog-api

FROM base AS runner

WORKDIR /app

RUN yarn global add turbo@latest &&\
    yarn global add pnpm

COPY --from=builder /app/ .

EXPOSE 3333

CMD [ "pnpm", "dev" ]

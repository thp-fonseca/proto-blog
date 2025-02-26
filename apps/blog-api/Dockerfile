FROM node:20.9-slim AS base

FROM base AS builder

WORKDIR /app

RUN yarn global add turbo@latest

COPY . .

RUN turbo prune blog-api --docker

FROM base AS installer

WORKDIR /app

RUN yarn global add turbo@latest &&\
    yarn global add pnpm

COPY --from=builder /app/out/json/ .

RUN pnpm install

COPY --from=builder /app/out/full/ .

RUN yarn turbo run build

FROM base AS runner

WORKDIR /http/app/apps/pkg

COPY --from=installer /app/apps/blog-api/package*.json ./
COPY --from=installer /app/apps/blog-api/node_modules ./node_modules/
COPY --from=installer /app/apps/blog-api/dist ./dist/
COPY --from=installer /app/config ../../config
COPY --from=installer /app/packages ../../packages

EXPOSE 3333

CMD ["npm", "run", "start:prod"]

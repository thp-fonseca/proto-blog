FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG PORT
ENV PORT=$PORT

RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

COPY . /app
WORKDIR /app

FROM base AS build

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --shamefully-hoist

RUN rm -rf ./apps/web

RUN pnpm run -r build

WORKDIR /usr/src/app/apps/blog-api

EXPOSE $PORT

CMD [ "pnpm", "start:prod" ]

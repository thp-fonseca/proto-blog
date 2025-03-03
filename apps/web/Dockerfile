FROM node:18-alpine AS base

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app

RUN yarn global add turbo@latest

COPY . .

RUN turbo prune web --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn global add pnpm && yarn global add turbo@latest

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .

RUN echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" > .env

RUN pnpm turbo run build
 
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
 
CMD ["node", "apps/web/server.js"]

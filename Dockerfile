# Antideploy uses a root Dockerfile when present. Build with pnpm, run with Node directly.
FROM node:22-bookworm-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

ENV NODE_ENV=production
EXPOSE 3000

# Antideploy provides PORT at runtime; server/index.ts reads it.
CMD ["node", "dist/index.js"]

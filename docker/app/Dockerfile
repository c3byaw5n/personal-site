# ==========================================
# [1] Base Stage
# ==========================================
FROM node:24-bookworm-slim AS base

WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=3000

# ==========================================
# [2] Dev Stage
# ==========================================
FROM base AS dev

RUN apt-get update \
  && apt-get install -y git \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app/node_modules && chown -R node:node /app

USER node
EXPOSE 3000

# ==========================================
# [3] Build Stage
# ==========================================
FROM base AS build

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ==========================================
# [4] Prod Stage
# ==========================================
FROM base AS prod

ENV NODE_ENV=production

COPY --from=build /app/.output /app/.output

USER node
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

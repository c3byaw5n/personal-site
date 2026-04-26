# ==========================================
# [1] Base Stage
# ==========================================
FROM node:24-bookworm-slim AS base

WORKDIR /app

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
# [3] Prod Stage
# ==========================================
FROM base AS prod

USER node
EXPOSE 3000

# syntax=docker/dockerfile:1

# ==================================================
# Base
# ==================================================
FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma

# ==================================================
# Development
# ==================================================
FROM base AS development

ENV NODE_ENV=development

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


# ==================================================
# Build
# ==================================================
FROM base AS build

ENV NODE_ENV=production

RUN npm ci

COPY . .

RUN npm run build


# ==================================================
# Production Dependencies
# ==================================================
FROM base AS prod-deps

ENV NODE_ENV=production

RUN npm ci --omit=dev


# ==================================================
# Production
# ==================================================
FROM node:22-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

# Dependências de produção.
COPY --from=prod-deps /app/node_modules ./node_modules

# Aplicação compilada.
COPY --from=build /app/dist ./dist

# Schema do Prisma.
COPY --from=build /app/prisma ./prisma

# package.json (informações da aplicação).
COPY package.json ./

USER node

EXPOSE 3000

CMD ["node", "dist/app.js"]

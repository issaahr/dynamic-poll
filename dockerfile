# syntax=docker/dockerfile:1

# ---------- Base ----------
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# ---------- Development ----------
FROM base AS development
ENV NODE_ENV=development
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---------- Build ----------
FROM base AS build
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build

# ---------- Production deps ----------
FROM base AS prod-deps
ENV NODE_ENV=production
RUN npm ci --omit=dev

# ---------- Production ----------
FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]

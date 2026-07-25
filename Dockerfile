# Multi-stage build for API
FROM node:18-alpine AS api-builder
WORKDIR /app
COPY apps/api/package*.json ./
RUN npm ci
COPY apps/api/ ./
RUN npm run build

# Multi-stage build for Web
FROM node:18-alpine AS web-builder
WORKDIR /app
COPY apps/web/package*.json ./
RUN npm ci
COPY apps/web/ ./
RUN npm run build

# Production API
FROM node:18-alpine AS api
WORKDIR /app
COPY --from=api-builder /app/node_modules ./node_modules
COPY --from=api-builder /app/dist ./dist
COPY apps/api/package*.json ./
EXPOSE 5000
CMD ["node", "dist/index.js"]

# Production Web
FROM node:18-alpine AS web
WORKDIR /app
COPY --from=web-builder /app/dist ./dist
COPY apps/web/package*.json ./
EXPOSE 5173
CMD ["npm", "run", "preview"]

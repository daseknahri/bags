FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime-base
WORKDIR /app
RUN apk add --no-cache wget
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY public ./public
COPY server ./server
COPY website-server.cjs admin-server.cjs ./
RUN mkdir -p /app/storage/uploads
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser
ENV NODE_ENV=production

FROM runtime-base AS website-production
ENV PORT=3004
ENV DATA_DIR=/app/storage/data
ENV UPLOADS_DIR=/app/storage/uploads
EXPOSE 3004
CMD ["node", "website-server.cjs"]

FROM runtime-base AS admin-production
ENV PORT=3104
ENV DATA_DIR=/app/storage/data
ENV UPLOADS_DIR=/app/storage/uploads
EXPOSE 3104
CMD ["node", "admin-server.cjs"]

# syntax=docker/dockerfile:1

FROM node:alpine as builder
WORKDIR /workspace
COPY . .

WORKDIR /workspace/plugin
RUN npm ci
RUN npm run build

WORKDIR /workspace/ui
RUN npm ci
RUN npm run build

FROM node:alpine AS runner
WORKDIR /app
COPY --from=builder /workspace/plugin/build/ ./plugin
COPY --from=builder /workspace/ui/build/ ./ui

EXPOSE 3000

CMD [ "npx", "serve", "-s", "/app/ui" ]
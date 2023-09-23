# syntax=docker/dockerfile:1

FROM node:alpine as builder
WORKDIR /workspace
COPY . .

WORKDIR /workspace/genpick
RUN npm ci
RUN npm run build

WORKDIR /workspace/ui
RUN npm ci

WORKDIR /workspace/server
RUN npm ci
RUN nm run build

FROM golang:alpine AS runner
RUN apk add --update nodejs npm
RUN apk update && apk add --no-cache make protobuf-dev
WORKDIR /app
COPY --from=builder /workspace/genpick/ ./genpick
COPY --from=builder /workspace/ui/ ./ui
COPY --from=builder /workspace/script/ ./script
COPY --from=builder /workspace/server/dist/ ./server
COPY --from=builder /workspace/proto/ ./proto

EXPOSE 3000

CMD [ "./script/run" ]
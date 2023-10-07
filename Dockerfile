# syntax=docker/dockerfile:1

FROM node:alpine as builder
WORKDIR /workspace
COPY . .

WORKDIR /workspace/ui
RUN npm ci

FROM golang:alpine AS runner
RUN apk add --update nodejs npm
RUN apk update && apk add --no-cache make protobuf-dev
WORKDIR /app
COPY --from=builder /workspace/ui/ ./ui
COPY --from=builder /workspace/script/ ./script
COPY --from=builder /workspace/proto/ ./proto

EXPOSE 3000

CMD [ "./script/run" ]
# syntax=docker/dockerfile:1

FROM node:alpine as builder
WORKDIR /workspace
COPY . .

WORKDIR /workspace/app
RUN npm ci
RUN npm run build

FROM golang:alpine AS runner
RUN apk add --update nodejs npm
RUN apk update && apk add --no-cache make protobuf-dev
WORKDIR /app
COPY --from=builder /workspace/app/ ./app
COPY --from=builder /workspace/script/ ./script

EXPOSE 3000

CMD [ "./script/run" ]
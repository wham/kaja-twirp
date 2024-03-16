# syntax=docker/dockerfile:1

FROM alpine:latest as builder
COPY app app
RUN apk add --update nodejs npm
WORKDIR /app
RUN npm ci --omit=dev
RUN npm run clean-modules

FROM alpine:latest as runner
COPY --from=builder /app /app
RUN apk add --update nodejs npm
WORKDIR /app
EXPOSE 3000
CMD ["npm", "start"]
# syntax=docker/dockerfile:1

FROM alpine:latest
COPY app app
RUN apk add --update nodejs npm
WORKDIR /app
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
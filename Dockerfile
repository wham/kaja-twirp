# syntax=docker/dockerfile:1

FROM alpine:latest
COPY app app
COPY script script
RUN apk add --update nodejs npm
WORKDIR /app
RUN npm ci --omit=dev
RUN /script/tidy_node_modules

EXPOSE 3000

CMD ["npm", "start"]
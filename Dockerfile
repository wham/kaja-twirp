# syntax=docker/dockerfile:1

FROM node:alpine as builder
WORKDIR /workspace
COPY . .

WORKDIR /workspace/genpick
RUN npm ci
RUN npm run build

WORKDIR /workspace/ui
RUN npm ci

FROM node:alpine AS runner
WORKDIR /app
COPY --from=builder /workspace/genpick/ ./genpick
COPY --from=builder /workspace/ui/ ./ui
COPY --from=builder /workspace/script/ ./script

EXPOSE 3000

CMD [ "./script/run" ]
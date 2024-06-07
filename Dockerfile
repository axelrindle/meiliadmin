FROM oven/bun as builder

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile && \
    bun run build


FROM nginxinc/nginx-unprivileged:alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

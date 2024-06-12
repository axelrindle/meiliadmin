FROM oven/bun as builder

ARG VITE_APP_VERSION
ARG VITE_APP_COMMIT

WORKDIR /app

COPY . .

RUN echo $VITE_APP_VERSION $VITE_APP_COMMIT

RUN bun install --frozen-lockfile && \
    bun run build


FROM nginxinc/nginx-unprivileged:alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

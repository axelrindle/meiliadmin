FROM oven/bun AS builder

ARG VITE_APP_VERSION
ARG VITE_APP_COMMIT

WORKDIR /app

COPY . .

RUN echo $VITE_APP_VERSION $VITE_APP_COMMIT

RUN bun install --frozen-lockfile && \
    bun run build


FROM nginxinc/nginx-unprivileged:alpine-slim

COPY docker /
COPY --from=builder /app/dist /usr/share/nginx/html

USER 0

RUN sed -i 's|#gzip.*|gzip on|g' /etc/nginx/nginx.conf

USER 101

EXPOSE 8080

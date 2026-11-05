FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund

COPY . .
RUN npx tsc --noEmit && npm run build:site

FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /app/dist/site /usr/share/nginx/html

USER 101:101
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

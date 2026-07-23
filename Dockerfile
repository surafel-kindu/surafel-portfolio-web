# ---- Stage 1: Build the React app ----
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source and build
COPY . .
RUN npm run build

# ---- Stage 2: Serve the static build with nginx ----
FROM nginx:1.27-alpine AS production

# SPA-aware nginx config (React Router fallback, gzip, caching)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the production build output
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]

# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Storybook
RUN npm run build-storybook

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=build /app/storybook-static /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

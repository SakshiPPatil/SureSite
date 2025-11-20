# =========================
# Frontend Dockerfile
# =========================
FROM node:18-bullseye-slim AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --silent

# Copy source code
COPY . .

# Copy environment file
COPY .env.local .env.local

# Ensure next binary is executable
RUN chmod +x node_modules/.bin/next

# Build Next.js app
RUN npm run build

# =========================
# Production image
# =========================
FROM node:18-bullseye-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./
RUN chmod -R 755 /usr/src/app && \
    chmod +x node_modules/.bin/*
# Expose port
EXPOSE 3000

# Run as root (default, no USER set)
CMD ["npx", "next", "start", "-p", "3000"]
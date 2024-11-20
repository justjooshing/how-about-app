# syntax = docker/dockerfile:1

# Base image with Node.js installed
ARG NODE_VERSION=22.4.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="NestJS"

# Work directory inside the container
WORKDIR /app

# Set production environment variable
ENV NODE_ENV="production"

# Install pnpm for package management
ARG PNPM_VERSION=8.6.3
RUN npm install -g pnpm@$PNPM_VERSION

# Build Stage: to install dependencies and build the app
FROM base AS build

# Install build dependencies for node-gyp and other build essentials
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copy everything from the root of the repo to the Docker image
COPY . .

# Install all dependencies (dev + prod)
RUN pnpm install -r --frozen-lockfile --prod=false

# Build the app (only the server in this case)
RUN pnpm --filter server build

# Re-run to install only production dependencies (after build)

# Re-run to install only production dependencies for /server
WORKDIR /app/server
RUN pnpm install -r --prod --frozen-lockfile

# Final Stage: Clean runtime image
FROM base AS final

# Copy the built dist and node_modules from the build stage
COPY --from=build /app/server/dist /app/server/dist
COPY --from=build /app/server/node_modules /app/server/node_modules

# Expose the application port
EXPOSE 3000

# Command to start the app
CMD ["node", "/app/server/dist/server/src/main.js"]

# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.4.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="NestJS"

# NestJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install pnpm
ARG PNPM_VERSION=8.6.3
RUN npm install -g pnpm@$PNPM_VERSION

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copy only required directories and files
COPY . .

# Install deps in all workspaces
RUN pnpm install -r --frozen-lockfile --prod=false

# Build application
RUN pnpm --filter server build

# Final stage for app image
FROM base AS final

# Copy built application
COPY --from=build /app/server/dist /app/server/dist

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

# Default command to start the server
CMD ["node", "/app/server/dist/main.js"]

# How-About-App Monorepo

## Overview

Welcome to the **How-About-App Monorepo**! This monorepo contains three key projects:

1. **Server** - Built with NestJS, this backend interacts with a PostgreSQL database hosted on Fly.io and fetches content from Contentful.
2. **User Client** - An Expo app for end users, supporting both mobile and web platforms. The web build is hosted on Cloudflare Pages.
3. **Venue Client** - A Vite-based client designed for restaurant and business use. Hosted on Cloudflare Pages as well.

## Repository Structure

how-about-app/ \
├── server/ # Backend application using NestJS \
├── user-client/ # Client application for users, built with Expo \
└── venue-client/ # Venue application for business-facing features, built with Vite

Each project has its own directory, containing source files and eventually its own README. This README covers the monorepo setup and shared dependencies.

## Goals

The monorepo setup allows for shared TypeScript types and seamless development across the three projects, streamlining deployments and updates.

## Installation

### Prerequisites

Ensure you have `pnpm` installed for managing dependencies across the monorepo.
Ensure you have `flyctl` installed for proxying into the Fly.io database.

You'll also need to have been granted access to the Fly.io workspace and the Contentful workspace.

### Setup

1. **Clone the Repository:**

```bash
  git clone https://github.com/your-repo/how-about-app.git
  cd how-about-app
```

2. Install Dependencies: Run `pnpm i`, and then `pnpm --filter <dir-name> i` for each of the directories, in the root directory to install dependencies for all projects.

### Environment Variables

### Server

To run the server locally, create a `.env` file in the `server` directory with the following variables:

```dotenv
DATABASE_URL=your_database_url
CONTENTFUL_SPACE_ID=the_contentful_space_id
CONTENTFUL_ENVIRONMENT=the_contentful_environment
CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
CONTENTFUL_CMA_TOKEN=your_contentful_content_management_access_token //only if generating types
```

Aside from the `DATABASE_URL`, the others can be retrieved from Contentful.

- The `CONTENTFUL_SPACE_ID` can be found in `⚙️ > General Settings` and copy the Space ID
- The `CONTENTFUL_ENVIRONMENT` can be found in `⚙️ > Environments` and copy the Environment ID
- The `CONTENTFUL_ACCESS_TOKEN` can be found in `⚙️ > API Keys > Server access token` and copy the Contentful Delivery ID
- The `CONTENTFUL_CMA_TOKEN` can be found in `⚙️ > CMA Tokens > Create personal access token`. This token has the ability to _create, delete, and update_ the content so be careful with it and set an expiry date. Currently this is just used when generating Contentful data types.

### User Client and Venue Client

Currently, no environment variables are required for these projects locally.

## Running Each Project

### Server

If this is the first time running the server, you'll need to run `fly auth login` and log into fly through your browser.

To start the server locally, navigate to the `server` directory and run:

```bash
pnpm start:dev
```

You could also run this from the root level with

```bash
pnpm --filter server start:dev
```

The server will proxy into to the PostgreSQL database on Fly.io and retrieve content from Contentful.

### User Client

To run the user client (Expo app), navigate to the user-client directory and use one of the following:

```bash
pnpm start # And then choose ios/android/web
```

```bash
pnpm web # For web-specific builds
```

You can also run this from the root level with:

```bash
pnpm --filter user-client web
```

### Venue Client

To run the venue client, navigate to the venue-client directory and run:

```bash
pnpm dev
```

You can also run this from the root level with:

```bash
pnpm --filter venue-client dev
```

## Production Hosting

- **Server and Database**: Hosted on Fly.io.
- **User Client**: Hosted on Cloudflare Pages.
- **Venue Client**: Hosted on Cloudflare Pages.

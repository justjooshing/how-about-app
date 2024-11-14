#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Ensure that all required environment variables are present
if [[ -z "$CONTENTFUL_SPACE_ID" || -z "$CONTENTFUL_ENVIRONMENT" || -z "$CONTENTFUL_CMA_TOKEN" ]]; then
  echo "ERROR: Missing required environment variables!"
  echo "Make sure your .env file contains CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT, and CONTENTFUL_CMA_TOKEN."
  exit 1
fi

# Run cf-content-types-generator to generate TypeScript types
npx cf-content-types-generator --v10 \
  -s "$CONTENTFUL_SPACE_ID" \
  -e "$CONTENTFUL_ENVIRONMENT" \
  -t "$CONTENTFUL_CMA_TOKEN" \
  -o types/generated \
  -d # Optionally, add JSDoc comments to generated types

echo "Contentful types generation complete. Output saved in the 'types' directory."

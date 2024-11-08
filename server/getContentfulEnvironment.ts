import { strict as assert } from 'assert';
import * as contentfulManagement from 'contentful-management';
import { EnvironmentGetter } from 'contentful-typescript-codegen';
import { config } from 'dotenv';

config();

const { CONTENTFUL_CMA_TOKEN, CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT } =
  process.env;

assert(CONTENTFUL_CMA_TOKEN);
assert(CONTENTFUL_SPACE_ID);
assert(CONTENTFUL_ENVIRONMENT);

const getContentfulEnvironment: EnvironmentGetter = () => {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: CONTENTFUL_CMA_TOKEN,
  });

  return contentfulClient
    .getSpace(CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(CONTENTFUL_ENVIRONMENT));
};

module.exports = getContentfulEnvironment;

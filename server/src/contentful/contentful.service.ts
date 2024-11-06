// src/contentful/contentful.service.ts
import { Injectable } from '@nestjs/common';
import * as contentfulManagement from 'contentful-management';

@Injectable()
export class ContentfulService {
  private client: contentfulManagement.PlainClientAPI;
  constructor() {
    this.client = contentfulManagement.createClient(
      {
        accessToken: process.env.CONTENTFUL_CMA_TOKEN,
      },
      {
        type: 'plain',
        defaults: {
          spaceId: process.env.CONTENTFUL_SPACE_ID,
          environmentId: 'master',
        },
      },
    );
  }

  async getContentTypes() {
    try {
      const contentTypes = await this.client.contentType
        .getMany({})
        .then((data) => data.items.map((item) => item.name.toLowerCase()));
      return contentTypes;
    } catch (error) {
      console.error('Error fetching content types:', error);
      throw error;
    }
  }
}

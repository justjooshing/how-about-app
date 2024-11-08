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

  async getAllDeals() {
    try {
      // Get contentful types
      const venue = await this.client.entry
        .getMany({
          query: {
            content_type: 'deal', // business | venue | deal
            // fields[field][match]: value // allows you to return only those where the field matches the value
            'fields.name[match]': 'LeonardsHouseOfLove_WilsonSt_3141_Aus',
            limit: 1,
          },
        })
        .then((data) => data.items[0]);
      console.log(venue.fields.name['en-US']);
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw error;
    }
  }
}

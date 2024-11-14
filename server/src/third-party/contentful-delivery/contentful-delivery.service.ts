import { Injectable } from '@nestjs/common';
import type { CONTENT_TYPE } from '@/types/contentful.d';
import { createClient, EntryCollection } from 'contentful';
import { ContentTypeSkeletonsMap, TargetQueryProps } from './types';
import { targetQuery } from './helpers';

@Injectable()
export class ContentfulDeliveryService {
  private accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  private space = process.env.CONTENTFUL_SPACE_ID;
  private environment = process.env.CONTENTFUL_ENVIRONMENT;

  private client = createClient({
    accessToken: this.accessToken,
    space: this.space,
    environment: this.environment,
  });

  async getContentTypes() {
    try {
      const contentTypes: CONTENT_TYPE[] = await this.client
        .getContentTypes({})
        .then((data) =>
          data.items.map((item) => item.name.toLowerCase() as CONTENT_TYPE),
        );
      return contentTypes;
    } catch (error) {
      console.error('Error fetching content types:', error);
      throw error;
    }
  }

  async getContentfulEntries<T extends CONTENT_TYPE>(
    query_params: TargetQueryProps<T>,
  ): Promise<EntryCollection<ContentTypeSkeletonsMap[T], undefined, string>> {
    try {
      return await this.client.getEntries<ContentTypeSkeletonsMap[T]>(
        targetQuery(query_params),
      );
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw error;
    }
  }
}

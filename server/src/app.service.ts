import { Injectable } from '@nestjs/common';
import * as contentful from 'contentful-management';
import { ContentfulService } from './contentful/contentful.service';

@Injectable()
export class AppService {
  constructor(private readonly contentfulService: ContentfulService) {}

  async getContentTypes(): Promise<string[]> {
    try {
      return await this.contentfulService.getContentTypes();
    } catch (err) {
      console.error(err);
    }
    return [];
  }
}

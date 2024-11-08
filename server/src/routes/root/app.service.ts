import { Injectable } from '@nestjs/common';
import { ContentfulService } from '../../third-party/contentful/contentful.service';

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

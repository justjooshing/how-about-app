import { Injectable } from '@nestjs/common';
import { ContentfulDeliveryService } from 'src/third-party/contentful-delivery/contentful-delivery.service';

@Injectable()
export class AppService {
  constructor(private readonly contentfulService: ContentfulDeliveryService) {}

  async getContentTypes(): Promise<string[]> {
    try {
      return await this.contentfulService.getContentTypes();
    } catch (err) {
      console.error(err);
    }
    return [];
  }
}

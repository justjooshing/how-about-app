import { ApiDeal, ApiDeals } from '@/types/api/deals';
import type { TypeDealFields } from '@/types/generated/index';
import { Injectable } from '@nestjs/common';
import { ContentfulDeliveryService } from 'src/third-party/contentful-delivery/contentful-delivery.service';

const cleanDeals = (fields: TypeDealFields): ApiDeal => {
  return {
    ...fields,
    tags: fields.tags || [],
    total_available: fields.total_available || null,
    // @ts-expect-error cannot map banner_images
    banner_images: fields.banner_images.map((image) => image.fields.file.url),
    owner: {
      name: fields.owner[0].fields.name,
      logo: fields.owner[0].fields.logo.fields.file.url,
    },
  };
};

@Injectable()
export class DealsService {
  constructor(private readonly contentfulService: ContentfulDeliveryService) {}

  async getAllDeals(): Promise<{
    deals: ApiDeals | null;
  }> {
    try {
      const response = await this.contentfulService.getContentfulEntries({
        content_type: 'deal',
        limit: 1,
        field: 'title',
        field_name: 'Burgers and Pints for Two People',
      });
      const cleanedDeals = response.items.map((item) =>
        // @ts-expect-error things title is string
        cleanDeals(item.fields),
      );
      return { deals: cleanedDeals };
    } catch (err) {
      console.error('ERROR', err);
    }
    return null;
  }
}

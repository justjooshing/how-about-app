import { ApiDeal, ApiDeals } from '@/shared/types/deals';
import type { TypeDealFields, TypeDealSkeleton } from '@/types/generated/index';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ContentfulDeliveryService } from 'src/third-party/contentful-delivery/contentful-delivery.service';

const cleanDeals = (fields: TypeDealFields): ApiDeal['fields'] => {
  return {
    ...fields,
    tags: fields.tags || [],
    // total_available: fields.total_available || null,
    // @ts-expect-error cannot map banner_images
    banner_images: fields.banner_images.map((image) => image.fields.file.url),
    owner: {
      name: fields.owner[0].fields.name,
      logo: fields.owner[0].fields.logo.fields.file.url,
    },
    // @ts-expect-error cannot map owned_deal_options
    owned_deal_options: fields.owned_deal_options.map(
      ({
        fields: { original_price, discounted_price, name, total_available },
      }) => ({
        name,
        original_price,
        discounted_price,
        total_available,
      }),
    ),
  };
};

@Injectable()
export class DealsService {
  constructor(private readonly contentfulService: ContentfulDeliveryService) {}

  async getAllDeals(): Promise<ApiDeals | []> {
    try {
      const response = await this.contentfulService.getContentfulEntries({
        content_type: 'deal',
        limit: 1,
        field: 'title',
        field_name: 'Burgers and Pints for Two People',
      });

      if (!response.items.length) return [];

      const cleanedDeals = response.items.map((item) => ({
        id: item.sys.id,
        // @ts-expect-error thinks title is Symbol<string>
        fields: cleanDeals(item.fields),
      }));

      return cleanedDeals;
    } catch (err) {
      throw new InternalServerErrorException('Something has gone wrong');
    }
    return null;
  }

  async getSingleDeal(dealId: string): Promise<ApiDeal> {
    try {
      const response =
        await this.contentfulService.getContentfulEntry<TypeDealSkeleton>(
          dealId,
        );
      if (!response) console.log(response);
      // @ts-expect-error thinks title is Symbol<string>
      return { id: response.sys.id, fields: cleanDeals(response.fields) };
    } catch (err) {
      if (err.id === 'NotFound') {
        throw new NotFoundException(`Deal with id ${dealId} not found`);
      }
      throw new InternalServerErrorException('Something has gone wrong');
    }
  }
}

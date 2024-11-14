import { TypeDealFields } from '../generated';

export interface ApiDeal
  extends Omit<TypeDealFields, 'owner' | 'tags' | 'banner_images'> {
  tags: TypeDealFields['tags'] | [];
  banner_images: string[];
  owner: {
    name: string;
    logo: string;
  };
}

export type ApiDeals = ApiDeal[];

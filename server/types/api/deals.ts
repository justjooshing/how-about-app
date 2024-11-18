import { TypeDealFields } from '../generated';

export interface ApiDeal
  extends Omit<
    TypeDealFields,
    'owned_deal_options' | 'owner' | 'tags' | 'banner_images'
  > {
  tags: TypeDealFields['tags'] | [];
  banner_images: string[];
  owner: {
    name: string;
    logo: string;
  };
  owned_deal_options: {
    original_price: number;
    discounted_price: number;
    name: string;
    total_available: number;
  };
}

export type ApiDeals = ApiDeal[];

import { TypeDealSkeleton } from "@/server/types/generated";

export interface ApiDeal {
  id: string;
  fields: Omit<
    TypeDealSkeleton,
    "title" | "owned_deal_options" | "owner" | "tags" | "banner_images"
  > & {
    title: TypeDealSkeleton["fields"]["title"]["values"];
    tags: TypeDealSkeleton["fields"]["tags"]["item"]["values"][];
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
    }[];
  };
}

export type ApiDeals = ApiDeal[];

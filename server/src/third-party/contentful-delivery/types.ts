import type {
  TypeAddressFields,
  TypeDealFields,
  TypeBusinessFields,
  TypeVenueFields,
  TypeBusinessSkeleton,
  TypeDealSkeleton,
  TypeVenueSkeleton,
  TypeAddressSkeleton,
} from '@/types/generated/index';
import type { CONTENT_TYPE } from '@/types/contentful.d';

export type ContentTypeSkeletonsMap = {
  business: TypeBusinessSkeleton;
  deal: TypeDealSkeleton;
  venue: TypeVenueSkeleton;
  address: TypeAddressSkeleton;
};

export type ContentTypeFieldsMap = {
  business: TypeBusinessFields;
  deal: TypeDealFields;
  venue: TypeVenueFields;
  address: TypeAddressFields;
};

type ContentTypeFieldsKey<T extends CONTENT_TYPE> =
  keyof ContentTypeFieldsMap[T];

export type { CONTENT_TYPE } from '@/types/contentful.d';
export interface TargetQueryProps<T extends CONTENT_TYPE> {
  content_type: T;
  limit?: number;
  field?: ContentTypeFieldsKey<T>;
  field_name?: string;
}

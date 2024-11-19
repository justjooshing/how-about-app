import type {
  TypeAddressFields,
  TypeDealFields,
  TypeBusinessFields,
  TypeVenueFields,
  TypeBusinessSkeleton,
  TypeDealSkeleton,
  TypeVenueSkeleton,
  TypeAddressSkeleton,
} from '@/server/types/generated/index';
import type { CONTENT_TYPE } from '@/server/types/contentful.d';

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

export interface TargetQueryProps<T extends CONTENT_TYPE> {
  content_type: T;
  limit?: number;
  field?: ContentTypeFieldsKey<T>;
  field_name?: string;
}

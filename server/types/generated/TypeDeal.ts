import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import type { TypeVenueSkeleton } from './TypeVenue';

/**
 * Fields type definition for content type 'TypeDeal'
 * @name TypeDealFields
 * @type {TypeDealFields}
 * @memberof TypeDeal
 */
export interface TypeDealFields {
  /**
   * Field type definition for field 'title' (Title)
   * @name Title
   * @localized false
   * @summary Something like "Steak and wine for two"
   */
  title: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'description' (Description)
   * @name Description
   * @localized false
   * @summary A short description of what the deal offers. Can also be in bullet points.
   */
  description: EntryFieldTypes.RichText;
  /**
   * Field type definition for field 'currency' (Currency)
   * @name Currency
   * @localized false
   * @summary Local ISO currency code
   */
  currency: EntryFieldTypes.Symbol<'AUD' | 'EUR' | 'GBP' | 'NZD'>;
  /**
   * Field type definition for field 'original_price' (Original Price)
   * @name Original Price
   * @localized false
   * @summary Original price (without deal)
   */
  original_price: EntryFieldTypes.Number;
  /**
   * Field type definition for field 'discounted_price' (Discounted Price)
   * @name Discounted Price
   * @localized false
   * @summary Current price (with deal)
   */
  discounted_price: EntryFieldTypes.Number;
  /**
   * Field type definition for field 'redemption_conditions' (Redemption Conditions)
   * @name Redemption Conditions
   * @localized false
   * @summary Include any redemption conditions
   */
  redemption_conditions: EntryFieldTypes.RichText;
  /**
   * Field type definition for field 'pax' (Pax)
   * @name Pax
   * @localized false
   * @summary Number of people this deal serves
   */
  pax: EntryFieldTypes.Integer;
  /**
   * Field type definition for field 'tags' (Tags)
   * @name Tags
   * @localized false
   * @summary Tags to help filter and label different deals
   */
  tags?: EntryFieldTypes.Array<
    EntryFieldTypes.Symbol<'Healthy' | 'Popular' | 'Vegan'>
  >;
  /**
   * Field type definition for field 'total_available' (Total Available)
   * @name Total Available
   * @localized false
   * @summary Total number of deals available to sell
   */
  total_available?: EntryFieldTypes.Integer;
  /**
   * Field type definition for field 'sale_start_date' (Sale Start Date)
   * @name Sale Start Date
   * @localized false
   * @summary Should be UTC-0
   */
  sale_start_date: EntryFieldTypes.Date;
  /**
   * Field type definition for field 'sale_end_date' (Sale End Date)
   * @name Sale End Date
   * @localized false
   * @summary Should be UTC-0
   */
  sale_end_date: EntryFieldTypes.Date;
  /**
   * Field type definition for field 'redeem_start_date' (Redeem Start Date)
   * @name Redeem Start Date
   * @localized false
   * @summary Should be UTC-0
   */
  redeem_start_date: EntryFieldTypes.Date;
  /**
   * Field type definition for field 'redeem_end_date' (Redeem End Date)
   * @name Redeem End Date
   * @localized false
   * @summary Should be UTC-0
   */
  redeem_end_date: EntryFieldTypes.Date;
  /**
   * Field type definition for field 'banner_images' (Banner Images)
   * @name Banner Images
   * @localized false
   * @summary Images shown on the deal
   */
  banner_images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  /**
   * Field type definition for field 'owner' (Owner Venue)
   * @name Owner Venue
   * @localized false
   * @summary Venue/s that will be promoting this deal
   */
  owner: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeVenueSkeleton>>;
}

/**
 * Entry skeleton type definition for content type 'deal' (Deal)
 * @name TypeDealSkeleton
 * @type {TypeDealSkeleton}
 * @author 6NZiusLBA8mEyLQBqPMMjV
 * @since 2024-11-04T06:27:35.513Z
 * @version 21
 */
export type TypeDealSkeleton = EntrySkeletonType<TypeDealFields, 'deal'>;
/**
 * Entry type definition for content type 'deal' (Deal)
 * @name TypeDeal
 * @type {TypeDeal}
 * @author 6NZiusLBA8mEyLQBqPMMjV
 * @since 2024-11-04T06:27:35.513Z
 * @version 21
 */
export type TypeDeal<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeDealSkeleton, Modifiers, Locales>;

import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import type { TypeBusinessSkeleton } from './TypeBusiness';
import type { TypeDealSkeleton } from './TypeDeal';

/**
 * Fields type definition for content type 'TypeVenue'
 * @name TypeVenueFields
 * @type {TypeVenueFields}
 * @memberof TypeVenue
 */
export interface TypeVenueFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   * @summary The name of the venue that will be accepting the deals
   */
  name: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'created_date' (Created Date)
   * @name Created Date
   * @localized false
   * @summary Should be UTC-0; Set today's date until we can automate
   */
  created_date: EntryFieldTypes.Date;
  /**
   * Field type definition for field 'categories' (Categories)
   * @name Categories
   * @localized false
   * @summary Categories to help us filter by venue
   */
  categories?: EntryFieldTypes.Array<
    EntryFieldTypes.Symbol<'French' | 'Italian'>
  >;
  /**
   * Field type definition for field 'logo' (Logo)
   * @name Logo
   * @localized false
   * @summary Logo to represent the venue
   */
  logo: EntryFieldTypes.AssetLink;
  /**
   * Field type definition for field 'owned_deals' (Owned Deals)
   * @name Owned Deals
   * @localized false
   * @summary Deals run by the venue
   */
  owned_deals?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeDealSkeleton>
  >;
  /**
   * Field type definition for field 'owner' (Owner Business)
   * @name Owner Business
   * @localized false
   * @summary Business that owns this venue
   */
  owner?: EntryFieldTypes.EntryLink<TypeBusinessSkeleton>;
}

/**
 * Entry skeleton type definition for content type 'venue' (Venue)
 * @name TypeVenueSkeleton
 * @type {TypeVenueSkeleton}
 * @author 6NZiusLBA8mEyLQBqPMMjV
 * @since 2024-11-04T05:57:45.063Z
 * @version 29
 */
export type TypeVenueSkeleton = EntrySkeletonType<TypeVenueFields, 'venue'>;
/**
 * Entry type definition for content type 'venue' (Venue)
 * @name TypeVenue
 * @type {TypeVenue}
 * @author 6NZiusLBA8mEyLQBqPMMjV
 * @since 2024-11-04T05:57:45.063Z
 * @version 29
 */
export type TypeVenue<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeVenueSkeleton, Modifiers, Locales>;

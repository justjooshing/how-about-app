import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import type { TypeVenueSkeleton } from './TypeVenue';

/**
 * Fields type definition for content type 'TypeBusiness'
 * @name TypeBusinessFields
 * @type {TypeBusinessFields}
 * @memberof TypeBusiness
 */
export interface TypeBusinessFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   */
  name?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'created_date' (Created Date)
   * @name Created Date
   * @localized false
   * @summary Should be UTC-0; Set today's date until we can automate
   */
  created_date: EntryFieldTypes.Date;
  /**
   * Field type definition for field 'owned_venues' (Owned Venues)
   * @name Owned Venues
   * @localized false
   */
  owned_venues: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeVenueSkeleton>
  >;
}

/**
 * Entry skeleton type definition for content type 'business' (Business)
 * @name TypeBusinessSkeleton
 * @type {TypeBusinessSkeleton}
 * @author 6NZiusLBA8mEyLQBqPMMjV
 * @since 2024-11-04T05:29:57.207Z
 * @version 15
 */
export type TypeBusinessSkeleton = EntrySkeletonType<
  TypeBusinessFields,
  'business'
>;
/**
 * Entry type definition for content type 'business' (Business)
 * @name TypeBusiness
 * @type {TypeBusiness}
 * @author 6NZiusLBA8mEyLQBqPMMjV
 * @since 2024-11-04T05:29:57.207Z
 * @version 15
 */
export type TypeBusiness<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeBusinessSkeleton, Modifiers, Locales>;

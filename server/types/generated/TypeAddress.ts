import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import type { TypeBusinessSkeleton } from './TypeBusiness';
import type { TypeVenueSkeleton } from './TypeVenue';

/**
 * Fields type definition for content type 'TypeAddress'
 * @name TypeAddressFields
 * @type {TypeAddressFields}
 * @memberof TypeAddress
 */
export interface TypeAddressFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   * @summary Business name
   */
  name?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'unit' (Unit)
   * @name Unit
   * @localized false
   * @summary Unit/Flat/Apartment number
   */
  unit?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'building' (Building)
   * @name Building
   * @localized false
   * @summary Building number of business
   */
  building?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'street' (Street)
   * @name Street
   * @localized false
   * @summary Street name of this business
   */
  street?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'city' (City)
   * @name City
   * @localized false
   * @summary City/District/Suburb of the Venue
   */
  city?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'region' (Region)
   * @name Region
   * @localized false
   * @summary State or region, smaller than a country, bigger than a city.
   */
  region?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'address_code' (Address Code)
   * @name Address Code
   * @localized false
   * @summary Postcode/Zipcode
   */
  address_code?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'country' (Country)
   * @name Country
   * @localized false
   */
  country?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'related_business_venue' (Related Business/Venue)
   * @name Related Business/Venue
   * @localized false
   */
  related_business_venue: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeBusinessSkeleton | TypeVenueSkeleton>
  >;
}

/**
 * Entry skeleton type definition for content type 'address' (Address)
 * @name TypeAddressSkeleton
 * @type {TypeAddressSkeleton}
 * @author 6NZiusLBA8mEyLQBqPMMjV
 * @since 2024-11-04T06:41:28.780Z
 * @version 7
 */
export type TypeAddressSkeleton = EntrySkeletonType<
  TypeAddressFields,
  'address'
>;
/**
 * Entry type definition for content type 'address' (Address)
 * @name TypeAddress
 * @type {TypeAddress}
 * @author 6NZiusLBA8mEyLQBqPMMjV
 * @since 2024-11-04T06:41:28.780Z
 * @version 7
 */
export type TypeAddress<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeAddressSkeleton, Modifiers, Locales>;

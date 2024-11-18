import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import type { TypeDealSkeleton } from './TypeDeal';

/**
 * Fields type definition for content type 'TypeDeal_options'
 * @name TypeDeal_optionsFields
 * @type {TypeDeal_optionsFields}
 * @memberof TypeDeal_options
 */
export interface TypeDeal_optionsFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   * @summary The name of the deal option
   */
  name: EntryFieldTypes.Symbol;
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
   * Field type definition for field 'total_available' (Total Available)
   * @name Total Available
   * @localized false
   * @summary Total number of deals of this option available
   */
  total_available?: EntryFieldTypes.Integer;
  /**
   * Field type definition for field 'owner_deal' (Owner Deal)
   * @name Owner Deal
   * @localized false
   * @summary The general deal details that this deal option belongs to
   */
  owner_deal: EntryFieldTypes.EntryLink<TypeDealSkeleton>;
}

/**
 * Entry skeleton type definition for content type 'deal_options' (Deal Options)
 * @name TypeDeal_optionsSkeleton
 * @type {TypeDeal_optionsSkeleton}
 * @author 6NZiusLBA8mEyLQBqPMMjV
 * @since 2024-11-18T03:00:51.233Z
 * @version 5
 */
export type TypeDeal_optionsSkeleton = EntrySkeletonType<
  TypeDeal_optionsFields,
  'deal_options'
>;
/**
 * Entry type definition for content type 'deal_options' (Deal Options)
 * @name TypeDeal_options
 * @type {TypeDeal_options}
 * @author 6NZiusLBA8mEyLQBqPMMjV
 * @since 2024-11-18T03:00:51.233Z
 * @version 5
 */
export type TypeDeal_options<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeDeal_optionsSkeleton, Modifiers, Locales>;

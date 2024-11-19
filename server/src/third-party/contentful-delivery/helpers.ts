import { CONTENT_TYPE } from '@/server/types/contentful';
import { TargetQueryProps } from './types';

export const targetQuery = <T extends CONTENT_TYPE>({
  field,
  field_name,
  ...props
}: TargetQueryProps<T>) =>
  ({
    include: 1,
    ...(field &&
      field_name && { [`fields.${String(field)}[match]`]: field_name }),
    ...props,
  }) as const;

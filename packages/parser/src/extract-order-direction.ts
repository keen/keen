import { SortMode } from '@keen.io/ui-core';

import { OrderBy, Direction } from './types';

const DIRECTIONS: Record<Direction, SortMode> = {
  DESC: 'descending',
  ASC: 'ascending',
};

export const extractOrderDirection = (orderBy: OrderBy): SortMode => {
  if (typeof orderBy === 'string') {
    return 'ascending';
  }

  if (Array.isArray(orderBy)) {
    const [firstSettings] = orderBy;
    const { direction } = firstSettings;

    return DIRECTIONS[direction];
  }

  const { direction } = orderBy;
  return DIRECTIONS[direction];
};

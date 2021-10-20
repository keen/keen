import { SortByType } from '@keen.io/ui-core';

/**
 * Sort data series based on provided sort settings.
 *
 * @param data - data series
 * @param sortBy - sort settings
 * @return sorted data series
 *
 */
export const sortData = (data: Record<string, any>, sortBy: SortByType) =>
  data.sort((a: any, b: any) => {
    const nameA = a[sortBy.property];
    const nameB = b[sortBy.property];
    if (nameA < nameB) return sortBy.sort === 'ascending' ? -1 : 1;
    if (nameA > nameB) return sortBy.sort === 'descending' ? -1 : 1;
    return 0;
  });

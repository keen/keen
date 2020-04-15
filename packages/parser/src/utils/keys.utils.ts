import { KEEN_KEY } from '../constants';

import { Query } from '../types';

export const mapKeys = (
  map: Record<string, string>,
  keys: string[],
  data: Record<string, any>[],
  labelSelector: string = KEEN_KEY
) => ({
  keys: keys.map((keyName: string) => map[keyName] || keyName),
  results: data.map(item => {
    const updatedData: Record<string, any> = {};

    Object.keys(item).forEach((keyName: string) => {
      const mappedKey = map[keyName] || keyName;
      updatedData[mappedKey] = item[keyName];
    });

    const label = item[labelSelector];
    const hasLabelMapping = map[label];
    if (hasLabelMapping) {
      updatedData[labelSelector] = map[label as any];
    }

    return updatedData;
  }),
});

export const createComputedKey = (query: Query, index: number) =>
  `${index}.${query.event_collection}.${query.analysis_type}`;

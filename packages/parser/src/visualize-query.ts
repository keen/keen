import { setDataType, DataType } from './set-data-type';

import { Charts, Query } from './types';

const DATA_TYPE_CHARTS_MAP: Record<DataType, Charts[]> = {
  singular: [],
  categorical: ['pie', 'bar'],
  'categorical-interval': ['bar', 'line'],
  'categorical-ordinal': ['bar', 'line'],
  chronological: ['bar', 'line'],
  'categorical-chronological': ['bar', 'line'],
  nominal: [],
  extraction: [],
};

export const visualizeQuery = (query: Query): Charts[] => {
  const type = setDataType(query);
  return DATA_TYPE_CHARTS_MAP[type];
};

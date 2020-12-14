import { Query } from '@keen.io/query';

export type VisualizationOptions = {
  query: Partial<Query>;
  keys: string[];
};

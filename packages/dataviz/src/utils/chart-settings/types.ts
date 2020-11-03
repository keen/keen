import { Query } from '@keen.io/parser';

export type VisualizationOptions = {
  query: Partial<Query>;
  keys: string[];
};

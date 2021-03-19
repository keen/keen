import { Query } from '@keen.io/query';
import { ComponentSettings } from '../../types';

export type VisualizationOptions = {
  query: Partial<Query>;
  keys: string[];
  componentSettings: ComponentSettings;
};

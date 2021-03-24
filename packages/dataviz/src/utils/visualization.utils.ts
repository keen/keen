import { parseQuery, mapKeys, KEEN_KEY } from '@keen.io/parser';
import { Widgets } from '@keen.io/widgets';

import { VisualizationInput, ComponentSettings } from '../types';

export const prepareVisualization = (
  input: VisualizationInput = {},
  keysMap: Record<string, string>,
  componentSettings: ComponentSettings,
  type?: Widgets,
  presentationTimezone?: string | number
) => {
  const parser = parseQuery(input as any, type, presentationTimezone);

  let keys: string[] = parser.keys;
  let results: Record<string, any>[] = parser.data;

  if (keysMap) {
    const labelSelector =
      'labelSelector' in componentSettings
        ? componentSettings.labelSelector
        : KEEN_KEY;
    const mappings = mapKeys(keysMap, keys, results, labelSelector);

    keys = mappings.keys;
    results = mappings.results;
  }

  return {
    keys,
    results,
  };
};

import { Widgets } from '@keen.io/widgets';
import { Options, VisualizationInput } from '../types';

const REQUIRED_PROPERTIES: Array<keyof Options> = ['container', 'type'];

const PREFIX = '@keen.io/dataviz';

export const validateOptions = (options: Options) => {
  REQUIRED_PROPERTIES.forEach(name => {
    if (!(name in options)) {
      throw new Error(`${PREFIX} - ${name} property is required`);
    }
  });

  const { container } = options;

  if (!(container instanceof HTMLElement || typeof container === 'string')) {
    throw new Error(
      `${PREFIX} - container property must be instance of HTMLElement or DOM Element selector`
    );
  }
};

export const setChartSettings = (
  input: VisualizationInput | VisualizationInput[] = {},
  type: Widgets
) => {
  const emptySettings = {};

  if (Array.isArray(input) || !Object.keys(input).length) return emptySettings;

  const { query } = input;

  switch (type) {
    case 'table':
      const { property_names } = query;
      return { columnsOrder: property_names };
    default:
      return emptySettings;
  }
};

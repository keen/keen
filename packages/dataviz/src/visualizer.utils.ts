import { Options } from './types';

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

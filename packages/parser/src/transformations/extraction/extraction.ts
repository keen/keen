import { Query } from '@keen.io/query';

import { extractEvent, fillWithEmptyKeys } from '../../utils';
import { ExtractionResult } from '../../types';

/**
 * Transforms results of extraction analysis.
 *
 * @param parserInput - Parser input properties
 * @return transformed extraction
 *
 */
export const transformExtraction = ({
  result,
}: {
  query?: Query;
  result: ExtractionResult[];
}) => {
  let data: Record<string, any>[] = [];
  let keys: string[] = [];

  result.forEach((event) => {
    const properties = Object.keys(event);
    if (properties.length !== 0) {
      const extractedEvent = extractEvent(event);
      data.push(extractedEvent);
      keys = [...keys, ...Object.keys(extractedEvent)];
    }
  });

  if (keys.length) {
    keys = [...new Set(keys)];
    data = fillWithEmptyKeys(keys, data);
  }

  return {
    data,
    keys,
  };
};

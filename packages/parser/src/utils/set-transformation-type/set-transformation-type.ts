import { Query, Step } from '@keen.io/query';

import { Transformation } from '../../types';

/**
 * Set type of transformation base on query semantic
 *
 * @param query - query settings
 * @param steps - funnel steps settings
 * @return type of transformation
 *
 */
export const setTransformationType = (
  query?: Query,
  steps?: Step[]
): Transformation | null => {
  if (steps) return 'funnel';
  if (query) {
    let transformation: Transformation = 'singular';
    const { analysis_type: analysisType, group_by: groupBy, interval } = query;

    if (groupBy) transformation = 'categorical';
    if (interval) transformation = 'chronological';
    if (groupBy && interval) transformation = 'categorical-chronological';

    if (analysisType === 'extraction') transformation = 'extraction';
    if (analysisType === 'select_unique') transformation = 'nominal';
    if (analysisType === 'select_unique' && groupBy)
      transformation = 'categorical-nominal';
    if (analysisType === 'select_unique' && interval)
      transformation = 'chronological-nominal';
    if (analysisType === 'select_unique' && interval && groupBy)
      transformation = 'chronological-categorical-nominal';

    return transformation;
  }

  return null;
};

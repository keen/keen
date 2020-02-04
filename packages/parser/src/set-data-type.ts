/* eslint-disable @typescript-eslint/camelcase */
import { Query } from './types';

export type DataType =
  | 'categorical-ordinal'
  | 'categorical-chronological'
  | 'categorical-interval'
  | 'extraction'
  | 'nominal'
  | 'singular'
  | 'chronological'
  | 'categorical';

export const setDataType = ({
  interval,
  group_by,
  analysis_type,
}: Query): null | DataType => {
  let type: DataType = null;

  const hasInterval = typeof interval === 'string';

  const hasGroupBy =
    typeof group_by === 'string' ||
    (Array.isArray(group_by) && group_by.length === 1);

  const hasDoubleGroupBy = Array.isArray(group_by) && group_by.length === 2;

  if (analysis_type === 'funnel') {
    type = 'categorical-ordinal';
  } else if (analysis_type === 'extraction') {
    type = 'extraction';
  } else if (analysis_type === 'select_unique') {
    type = 'nominal';
  } else if (!hasGroupBy && !hasInterval && !hasDoubleGroupBy) {
    type = 'singular';
  } else if (hasGroupBy && !hasInterval) {
    type = 'categorical';
  } else if (hasInterval && !hasGroupBy && !hasDoubleGroupBy) {
    type = 'chronological';
  } else if (hasInterval && (hasGroupBy || hasDoubleGroupBy)) {
    type = 'categorical-chronological';
  } else if (!hasInterval && hasDoubleGroupBy) {
    type = 'categorical';
  }

  return type;
};

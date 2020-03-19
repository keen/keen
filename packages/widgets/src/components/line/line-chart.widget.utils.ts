import { timeFormat } from 'd3-time-format';

export const createLabelFormatter = (dateFormat = '%D %b') => (date: Date) => {
  const format = timeFormat(dateFormat);
  return format(date);
};

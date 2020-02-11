import { timeFormat } from 'd3-time-format';
import { TimePrecision } from '@keen.io/charts';

const DATE_FORMATS: Record<TimePrecision, string> = {
  minute: '%I:%M:%S %p',
  hour: '%I:%M %p',
  day: '%b %a %y',
  week: '%d %a',
  month: '%b %y',
  year: '%b, %Y',
};

export const createLabelFormatter = (
  precision: TimePrecision
): ((label: string | number) => string | number) => {
  const format = DATE_FORMATS[precision] || DATE_FORMATS['month'];
  const formatTime = timeFormat(format);
  return (date: string | number) => formatTime(new Date(date));
};

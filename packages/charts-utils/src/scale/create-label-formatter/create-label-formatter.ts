import { timeFormat } from 'd3-time-format';

import { TimePrecision } from '../../types';

const DATE_FORMATS: Record<TimePrecision, string> = {
  minute: '%I:%M:%S %p',
  hour: '%I:%M %p',
  day: '%e %a %y',
  week: '%d %a',
  month: '%b %y',
  year: '%b, %Y',
};

const createLabelFormatter = (
  precision: TimePrecision
): ((label: string | number) => string | number) => {
  const format = DATE_FORMATS[precision] || DATE_FORMATS['month'];
  const formatTime = timeFormat(format);
  return (date: string | number) => formatTime(new Date(date));
};

export default createLabelFormatter;

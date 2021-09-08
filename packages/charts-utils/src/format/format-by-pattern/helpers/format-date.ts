import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

dayjs.extend(utcPlugin);

export const formatDate = (
  value: string | number | Date,
  dateFormatter: string,
  timeFormatter: string
) => {
  if (dayjs(value).isValid()) {
    let datetime;
    if (isNaN(value as any)) {
      datetime = dayjs.utc(value);
    } else {
      datetime = dayjs.utc(+value * 1000); // unix timestamp
    }
    let pattern = '';
    if (dateFormatter && dateFormatter.trim() !== 'hidden') {
      pattern += dateFormatter;
    }
    if (timeFormatter && timeFormatter.trim() !== 'hidden') {
      pattern += timeFormatter;
    }
    return datetime.format(pattern);
  }
  return value;
};

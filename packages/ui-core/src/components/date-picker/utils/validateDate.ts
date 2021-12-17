import dayjs from 'dayjs';
import { DATE_FORMAT } from '../constants';

export const validateDate = (date: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/g;
  const isFormatValid = regex.test(date);

  if (!isFormatValid) return false;

  return dayjs(date, DATE_FORMAT).format(DATE_FORMAT) === date;
};

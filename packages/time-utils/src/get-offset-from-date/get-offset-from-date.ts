const REGEXP = /([+-])(\d{2}):?(\d{2})/;

/**
 * Converts date based on provided named timezone.
 *
 * @param utcISODate - Date UTC ISO string
 * @return offset in minutes
 *
 */
const getOffsetFromDate = (utcIsoDate: string) => {
  if (/Z$/.test(utcIsoDate)) return 0;
  const regexp: any = REGEXP.exec(utcIsoDate);
  return regexp && (+regexp[3] + regexp[2] * 60) * (regexp[1] === '+' ? 1 : -1);
};

export default getOffsetFromDate;

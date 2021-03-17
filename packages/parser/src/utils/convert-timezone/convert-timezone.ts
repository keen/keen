import moment from 'moment-timezone';

const convertDateTimezone = (utcISODate: string, timezone = 'UTC') =>
  moment.utc(utcISODate).tz(timezone).format('YYYY-MM-DDTHH:mm:ss.SSS') + `Z`;

export default convertDateTimezone;

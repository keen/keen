import { Intervals } from '../types';

const isCustomInterval = (interval: string | Intervals) =>
  interval.includes('every');

export default isCustomInterval;

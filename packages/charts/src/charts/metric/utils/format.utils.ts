import { format } from 'd3-format';

const formatter = format('.2s');

export const formatNumber = (value: number) => formatter(value);

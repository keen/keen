import { Options } from './pie-chart.utils';
import { chartColors } from '../../theme';

export const chartData = [
  { name: 'Books', value: 10 },
  { name: 'Apps', value: 20 },
  { name: 'Games', value: 5 },
  { name: 'Sounds', value: 10 },
  { name: 'Cars', value: 12 },
];

export const pieChart: Options = {
  data: chartData,
  labelSelector: 'name',
  valueSelector: 'value',
  dimension: { width: 100, height: 100 },
  margins: { top: 10, bottom: 10, left: 10, right: 10 },
  colors: chartColors,
  padAngle: 0.01,
  innerRadius: 20,
  labelsPosition: 'inside',
};

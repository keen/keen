import { CircularChart } from '../../utils/';
import { chartColors } from '../../theme';

export const chartData = [
  { name: 'Books', buy: 10, sold: 12 },
  { name: 'Apps', buy: 20, sold: 12 },
  { name: 'Games', buy: 5, sold: 34 },
  { name: 'Sounds', buy: 10, sold: 15 },
  { name: 'Cars', buy: 12, sold: 25 },
  { name: 'Bikes', buy: 1, sold: 5 },
  { name: 'Movies', buy: 2, sold: 3 },
];

export const pieChart: CircularChart = {
  data: chartData,
  labelSelector: 'name',
  keys: ['buy', 'sold'],
  disabledLabels: [],
  dimension: { width: 100, height: 100 },
  margins: { top: 10, bottom: 10, left: 10, right: 10 },
  colors: chartColors,
  padAngle: 0.01,
  padRadius: 100,
  cornerRadius: 4,
  innerRadius: 20,
  labelsRadius: 30,
  labelsPosition: 'inside',
};

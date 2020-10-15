export const chartData = [
  { name: 'Windows XP 2013', users: 3, licenses: 52, shops: 12 },
  { name: 'MacOS', users: 19, licenses: 82, shops: 15 },
  { name: 'Linux', users: 20, licenses: 15, shops: 23 },
  { name: 'Android', users: 3, licenses: 15, shops: 30 },
];

export const heatmapChart: any = {
  dimension: {
    width: 500,
    height: 400,
  },
  margins: { top: 10, bottom: 20, left: 10, right: 10 },
  minValue: 'auto',
  maxValue: 'auto',
  keys: ['sale', 'buy', 'revenue'],
  labelSelector: 'label',
  colors: ['red', 'blue', 'green'],
};

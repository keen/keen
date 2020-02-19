export const chartData = [
  { name: 'Windows', users: 3, licenses: 52, shops: 12 },
  { name: 'MacOS', users: 19, licenses: 82, shops: 15 },
  { name: 'Linux', users: 20, licenses: 15, shops: 23 },
  { name: 'Android', users: 3, licenses: 15, shops: 30 },
];

export const verticalBarChart: any = {
  dimension: {
    width: 500,
    height: 400,
  },
  xScaleSettings: { type: 'band' },
  yScaleSettings: { type: 'linear' },
  disabledKeys: [],
  margins: { top: 10, bottom: 20, left: 10, right: 10 },
  minValue: 'auto',
  maxValue: 'auto',
  barPadding: 0,
  layout: 'vertical',
  keys: ['sale', 'buy', 'revenue'],
  labelSelector: 'label',
  colors: ['red', 'blue', 'green'],
};

export const horizontalBarChart: any = {
  dimension: {
    width: 400,
    height: 300,
  },
  xScaleSettings: { type: 'band' },
  yScaleSettings: { type: 'linear' },
  disabledKeys: [],
  margins: { top: 15, bottom: 20, left: 10, right: 10 },
  minValue: 'auto',
  maxValue: 'auto',
  barPadding: 0,
  layout: 'horizontal',
  keys: ['sale', 'buy'],
  labelSelector: 'label',
  colors: ['red', 'green'],
};

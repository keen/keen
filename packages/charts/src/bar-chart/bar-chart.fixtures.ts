export const verticalBarChart: any = {
  dimension: {
    width: 500,
    height: 400,
  },
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
  margins: { top: 15, bottom: 20, left: 10, right: 10 },
  minValue: 'auto',
  maxValue: 'auto',
  barPadding: 0,
  layout: 'horizontal',
  keys: ['sale', 'buy'],
  labelSelector: 'label',
  colors: ['red', 'green'],
};

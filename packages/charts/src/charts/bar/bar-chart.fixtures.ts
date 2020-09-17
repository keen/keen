import { Bar } from './types';

export const chartData = [
  { name: 'Windows', users: 3, licenses: 52, shops: 12 },
  { name: 'MacOS', users: 19, licenses: 82, shops: 15 },
  { name: 'Linux', users: 20, licenses: -15, shops: 23 },
  { name: 'Android', users: 63, licenses: -15, shops: -30 },
];

export const bars: Bar[] = [
  {
    key: 'Marketing',
    selector: [0, 'value'],
    x: 10,
    y: 20,
    value: 100,
    height: 20,
    width: 30,
    color: 'red',
  },
  {
    key: 'IT',
    selector: [1, 'value'],
    x: 20,
    y: 40,
    value: 150,
    height: 40,
    width: 20,
    color: 'blue',
  },
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

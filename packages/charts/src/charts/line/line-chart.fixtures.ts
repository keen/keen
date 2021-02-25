export const chartData = [
  {
    name: '2020-01-01T00:00:00.000Z',
    users: -3,
    licenses: -52,
    shops: -12,
    books: -54,
  },
  {
    name: '2020-02-01T00:00:00.000Z',
    users: 6,
    licenses: 54,
    shops: 34,
    books: 89,
  },
  {
    name: '2020-03-01T00:00:00.000Z',
    users: -10,
    licenses: 15,
    shops: 23,
    books: 10,
  },
  {
    name: '2020-04-01T00:00:00.000Z',
    users: 20,
    licenses: -25,
    shops: -25,
    books: 12,
  },
  {
    name: '2020-05-01T00:00:00.000Z',
    users: 10,
    licenses: 26,
    shops: 34,
    books: -26,
  },
  {
    name: '2020-06-01T00:00:00.000Z',
    users: -4,
    licenses: -34,
    shops: 25,
    books: 74,
  },
];

export const lineChart: any = {
  dimension: {
    width: 500,
    height: 400,
  },
  margins: { top: 10, bottom: 20, left: 10, right: 10 },
  minValue: 'auto',
  maxValue: 'auto',
  keys: ['sale', 'buy', 'revenue'],
  disabledKeys: [],
  strokeWidth: 1,
  labelSelector: 'label',
  colors: ['red', 'blue', 'green'],
  xScaleSettings: { type: 'time', precision: 'month', useUTC: false },
};

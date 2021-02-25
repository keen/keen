import { generateLines } from './chart.utils';
import { lineChart } from '../line-chart.fixtures';

const data = [
  { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
  { label: '2020-03-01T00:00:00.000Z', sale: 12, buy: 3, revenue: 21 },
  { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
];

const lineChartSettings: any = {
  data,
  ...lineChart,
};

test('should generate steps correctly', () => {
  const { steps } = generateLines(lineChartSettings);

  expect(steps).toMatchInlineSnapshot(`
    Array [
      Object {
        "height": 370,
        "key": "0.revenue.step",
        "middle": Infinity,
        "selector": Array [
          0,
          "revenue",
        ],
        "width": 20,
        "x": 0,
        "y": 10,
      },
      Object {
        "height": 370,
        "key": "1.revenue.step",
        "middle": 929.0537858422939,
        "selector": Array [
          1,
          "revenue",
        ],
        "width": 20,
        "x": 929.0322580645161,
        "y": 10,
      },
      Object {
        "height": 370,
        "key": "2.revenue.step",
        "middle": 480.0416666666667,
        "selector": Array [
          2,
          "revenue",
        ],
        "width": 20,
        "x": 480,
        "y": 10,
      },
    ]
  `);
});

import { generateGroupedLines, generateStackLines } from './chart.utils';
import { lineChart } from '../line-chart.fixtures';

const data = [
  { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
  { label: '2020-03-01T00:00:00.000Z', sale: 12, buy: 3, revenue: -21 },
  { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
];

const lineChartSettings: any = {
  data,
  ...lineChart,
};

test('should generate grouped lines correctly', () => {
  const { lines } = generateGroupedLines(lineChartSettings);

  expect(lines).toMatchInlineSnapshot(`
    Array [
      Object {
        "color": "red",
        "d": "M10,232L939.0322580645161,131.0909090909091L490,232",
        "key": "sale",
        "selector": Array [
          0,
          "sale",
        ],
        "strokeWidth": 1,
      },
      Object {
        "color": "blue",
        "d": "M10,137.8181818181818L939.0322580645161,191.63636363636365L490,137.8181818181818",
        "key": "buy",
        "selector": Array [
          1,
          "buy",
        ],
        "strokeWidth": 1,
      },
      Object {
        "color": "green",
        "d": "M10,10L939.0322580645161,353.0909090909091L490,10",
        "key": "revenue",
        "selector": Array [
          2,
          "revenue",
        ],
        "strokeWidth": 1,
      },
    ]
  `);
});

test('should generate grouped lines correctly', () => {
  const { lines } = generateStackLines(lineChartSettings);

  expect(lines).toMatchInlineSnapshot(`
    Array [
      Object {
        "color": "red",
        "d": "M10,263.7142857142857L939.0322580645161,184.42857142857142L490,263.7142857142857",
        "key": "sale",
        "selector": Array [
          0,
          "sale",
        ],
        "strokeWidth": 1,
      },
      Object {
        "color": "blue",
        "d": "M10,205.57142857142858L939.0322580645161,168.57142857142858L490,205.57142857142858",
        "key": "buy",
        "selector": Array [
          1,
          "buy",
        ],
        "strokeWidth": 1,
      },
      Object {
        "color": "green",
        "d": "M10,46.99999999999999L939.0322580645161,279.5714285714286L490,46.99999999999999",
        "key": "revenue",
        "selector": Array [
          2,
          "revenue",
        ],
        "strokeWidth": 1,
      },
    ]
  `);
});

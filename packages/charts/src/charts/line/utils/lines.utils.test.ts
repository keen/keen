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
        "color": "green",
        "d": "M10,137.8181818181818L939.0322580645161,191.63636363636365L490,137.8181818181818",
        "key": "buy",
        "selector": Array [
          2,
          "buy",
        ],
        "strokeWidth": 1,
      },
      Object {
        "color": "blue",
        "d": "M10,10L939.0322580645161,353.0909090909091L490,10",
        "key": "revenue",
        "selector": Array [
          1,
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
        "d": "M10,328.2L939.0322580645161,217.20000000000002L490,328.2",
        "key": "sale",
        "selector": Array [
          0,
          "sale",
        ],
        "strokeWidth": 1,
      },
      Object {
        "color": "blue",
        "d": "M10,246.8L939.0322580645161,195L490,246.8",
        "key": "buy",
        "selector": Array [
          1,
          "buy",
        ],
        "strokeWidth": 1,
      },
      Object {
        "color": "green",
        "d": "M10,24.80000000000001L939.0322580645161,350.40000000000003L490,24.80000000000001",
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

import {
  generateSeriesBlockHeight,
  generateAreaGradient,
} from './gradient.utils';
import { generateLines } from './chart.utils';

import { GROUPED_GRADIENT, STACKED_GRADIENT } from '../constants';

import { lineChart } from '../line-chart.fixtures';

const data = [
  { label: '2020-01-01T00:00:00.000Z', sale: -5 },
  { label: '2020-02-01T00:00:00.000Z', sale: 3 },
  { label: '2020-03-01T00:00:00.000Z', sale: 12 },
];

const lineChartSettings: any = {
  data,
  ...lineChart,
};

test('should generate correctly series block height ', () => {
  const { yScale } = generateLines(lineChartSettings);
  const serieBlockHeight = generateSeriesBlockHeight(
    -5,
    12,
    yScale,
    -5,
    12,
    false
  );

  expect(serieBlockHeight).toMatchInlineSnapshot(`
    Object {
      "height": 349.4444444444444,
      "y": 10,
    }
  `);
});

test('should generate correctly default gradient for the block grouped gradient', () => {
  const gradient = generateAreaGradient(
    -5,
    12,
    'red',
    GROUPED_GRADIENT.default.min,
    GROUPED_GRADIENT.default.max
  );

  expect(gradient).toMatchInlineSnapshot(`
    Object {
      "gradientZeroPercent": 70.58823529411765,
      "negativeColor": "rgba(255, 0, 0, 0.45000000000000007)",
      "positiveColor": "rgba(255, 0, 0, 0.8)",
      "zeroPointColor": "rgba(255, 0, 0, 0.2)",
    }
  `);
});

test('should generate correctly disabled gradient for the block grouped gradient', () => {
  const gradient = generateAreaGradient(
    -5,
    12,
    'red',
    GROUPED_GRADIENT.disabled.min,
    GROUPED_GRADIENT.disabled.max
  );

  expect(gradient).toMatchInlineSnapshot(`
    Object {
      "gradientZeroPercent": 70.58823529411765,
      "negativeColor": "rgba(255, 0, 0, 0.11250000000000002)",
      "positiveColor": "rgba(255, 0, 0, 0.2)",
      "zeroPointColor": "rgba(255, 0, 0, 0.05)",
    }
  `);
});

test('should generate correctly default gradient for the block stacked gradient', () => {
  const gradient = generateAreaGradient(
    -5,
    12,
    'red',
    STACKED_GRADIENT.default.min,
    STACKED_GRADIENT.default.max
  );

  expect(gradient).toMatchInlineSnapshot(`
    Object {
      "gradientZeroPercent": 70.58823529411765,
      "negativeColor": "rgba(255, 0, 0, 0.4666666666666667)",
      "positiveColor": "rgba(255, 0, 0, 0.7)",
      "zeroPointColor": "rgba(255, 0, 0, 0.3)",
    }
  `);
});

test('should generate correctly disabled gradient for the block stacked gradient', () => {
  const gradient = generateAreaGradient(
    -5,
    12,
    'red',
    STACKED_GRADIENT.disabled.min,
    STACKED_GRADIENT.disabled.max
  );

  expect(gradient).toMatchInlineSnapshot(`
    Object {
      "gradientZeroPercent": 70.58823529411765,
      "negativeColor": "rgba(255, 0, 0, 0.11250000000000002)",
      "positiveColor": "rgba(255, 0, 0, 0.2)",
      "zeroPointColor": "rgba(255, 0, 0, 0.05)",
    }
  `);
});

test('should generate gradient percent value as zero when max positive value and min positive value are zero', () => {
  const gradient = generateAreaGradient(
    0,
    0,
    'red',
    STACKED_GRADIENT.disabled.min,
    STACKED_GRADIENT.disabled.max
  );

  expect(gradient).toMatchInlineSnapshot(`
    Object {
      "gradientZeroPercent": 0,
      "negativeColor": "rgba(255, 0, 0, 0.125)",
      "positiveColor": "rgba(255, 0, 0, 0.125)",
      "zeroPointColor": "rgba(255, 0, 0, 0.125)",
    }
  `);
});

import { colors } from '@keen.io/colors';
import generateContinuousColorScale from './generate-continous-color-scale';

const chartColors = [
  colors.lightBlue[500],
  colors.green[500],
  colors.orange[400],
  colors.blue[500],
  colors.yellow[500],
  colors.red[400],
  colors.purple[500],
  colors.green[200],
  colors.pink[500],
  colors.blue[200],
  colors.yellow[200],
  colors.purple[100],
  colors.lightBlue[100],
  colors.pink[200],
];

test('should create colorScale for 1 step and all positive values', () => {
  const colorScale = generateContinuousColorScale(1, 10, 1, chartColors);

  expect(colorScale.domain()).toMatchInlineSnapshot(`
    Array [
      1,
      10,
    ]
  `);
  expect(colorScale.range()).toMatchInlineSnapshot(`
    Array [
      "#FFFFFF",
      "#85B4C3",
    ]
  `);
});

test('should create colorScale for 1 step and all negative values', () => {
  const colorScale = generateContinuousColorScale(
    -1000000,
    -10,
    1,
    chartColors
  );

  expect(colorScale.domain()).toMatchInlineSnapshot(`
    Array [
      -1000000,
      -10,
    ]
  `);
  expect(colorScale.range()).toMatchInlineSnapshot(`
    Array [
      "#85B4C3",
      "#FFFFFF",
    ]
  `);
});

test('should create colorScale for 1 theme color, positive and negative values', () => {
  const colorScale = generateContinuousColorScale(-1000000, 10, 3, [
    chartColors[0],
  ]);

  expect(colorScale.domain()).toMatchInlineSnapshot(`
    Array [
      -1000000,
      0,
      10,
    ]
  `);
  expect(colorScale.range()).toMatchInlineSnapshot(`
    Array [
      "#85B4C3",
      "#FFFFFF",
      "#7a4b3c",
    ]
  `);
});

test('should create colorScale for 2 steps, positive and negative values', () => {
  const colorScale = generateContinuousColorScale(-20, 10000, 2, chartColors);

  expect(colorScale.domain()).toMatchInlineSnapshot(`
    Array [
      -20,
      0,
      10000,
    ]
  `);
  expect(colorScale.range()).toMatchInlineSnapshot(`
    Array [
      "#85B4C3",
      "#FFFFFF",
      "#487650",
    ]
  `);
});

test('should create colorScale for 3 steps, positive and negative values', () => {
  const colorScale = generateContinuousColorScale(-30, 80, 3, chartColors);

  expect(colorScale.domain()).toMatchInlineSnapshot(`
    Array [
      -30,
      0,
      43.333333333333336,
      80,
    ]
  `);
  expect(colorScale.range()).toMatchInlineSnapshot(`
    Array [
      "#85B4C3",
      "#FFFFFF",
      "#487650",
      "#D95B24",
    ]
  `);
});

test('should create colorScale for 4 steps, positive and negative values', () => {
  const colorScale = generateContinuousColorScale(
    -3000000,
    80000,
    4,
    chartColors
  );

  expect(colorScale.domain()).toMatchInlineSnapshot(`
    Array [
      -3000000,
      -2230000,
      -1460000,
      0,
      80000,
    ]
  `);
  expect(colorScale.range()).toMatchInlineSnapshot(`
    Array [
      "#85B4C3",
      "#487650",
      "#D95B24",
      "#FFFFFF",
      "#27566D",
    ]
  `);
});

test('should create colorScale for 2 steps and positive values', () => {
  const colorScale = generateContinuousColorScale(5, 1000000, 2, chartColors);

  expect(colorScale.domain()).toMatchInlineSnapshot(`
    Array [
      5,
      500002.5,
    ]
  `);
  expect(colorScale.range()).toMatchInlineSnapshot(`
    Array [
      "#85B4C3",
      "#487650",
    ]
  `);
});

test('should create colorScale for 2 steps and negative values', () => {
  const colorScale = generateContinuousColorScale(-1000000, -5, 2, chartColors);

  expect(colorScale.domain()).toMatchInlineSnapshot(`
    Array [
      -1000000,
      -500002.5,
    ]
  `);
  expect(colorScale.range()).toMatchInlineSnapshot(`
    Array [
      "#85B4C3",
      "#487650",
    ]
  `);
});

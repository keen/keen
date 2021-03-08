import { generateFunnel } from './chart.utils';

import { chartData } from '../funnel-chart.fixtures';
import { theme } from '../../../theme';

test('creates step for each data series', () => {
  const { steps } = generateFunnel({
    data: chartData,
    key: 'value',
    colors: theme.colors,
  });

  expect(steps.length).toEqual(chartData.length);
});

test('calculates percentage values for each step', () => {
  const { steps } = generateFunnel({
    data: chartData,
    key: 'value',
    colors: theme.colors,
  });

  expect(steps).toMatchObject([
    {
      percentageValue: 100,
      nextPercentageValue: 50,
    },
    {
      percentageValue: 50,
      nextPercentageValue: 25,
    },
    {
      percentageValue: 25,
      nextPercentageValue: 25,
    },
  ]);
});

test('set "0" for percentage values if the value for the first serie is "0"', () => {
  const chartData = [
    { name: 'Emails', value: 0 },
    { name: 'Visits', value: 500 },
    { name: 'Logins', value: 250 },
  ];
  const { steps } = generateFunnel({
    data: chartData,
    key: 'value',
    colors: theme.colors,
  });

  steps.forEach((step) => {
    const { percentageValue, nextPercentageValue } = step;
    expect(percentageValue).toEqual(0);
    expect(nextPercentageValue).toEqual(0);
  });
});

test('set color for each step', () => {
  const { steps } = generateFunnel({
    data: chartData,
    key: 'value',
    colors: theme.colors,
  });

  steps.forEach((step, idx) => {
    expect(step).toHaveProperty('color');
    expect(step.color).toEqual(theme.colors[idx]);
  });
});

test('creates "linear" scale with proper domain', () => {
  const { scale } = generateFunnel({
    data: chartData,
    key: 'value',
    colors: theme.colors,
  });

  expect(scale.domain()).toMatchInlineSnapshot(`
    Array [
      0,
      100,
    ]
  `);
});

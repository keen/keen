import { scaleBand, scaleLinear } from 'd3-scale';
import { getBarColor, getColor, calculateGroupedBars } from './bar.utils';

import { chartData } from '../bar-chart.fixtures';

const colors = ['red', 'green', 'blue'];

describe('getBarColor()', () => {
  test('should get correct bar color', () => {
    const parameters = {
      activeBar: {
        selector: [1, 'users'],
        key: '1.users',
      },
      barKey: '1.users',
      barSelector: [1, 'users'],
      stackMode: 'normal',
      groupMode: 'grouped',
      color: 'red',
    };
    const result = getBarColor(parameters);
    expect(result).toBe('rgba(255,0,0,0.95)');
  });
});

describe('getColor()', () => {
  test('should return green color', () => {
    const result = getColor(1, colors);

    expect(result).toBe('green');
  });

  test('should return black color', () => {
    const result = getColor(3, colors);

    expect(result).toBe('#1D2729');
  });
});

describe('calculateGroupedBars()', () => {
  const keys = ['users', 'licenses', 'shops'];
  const labelSelector = 'name';
  const range = [true, true, true, true];

  test('should calculate grouped bars correctly for vertical layout', () => {
    const xScale = scaleBand()
      .range([0, 100])
      .domain(chartData.map((item: any) => item[labelSelector]))
      .padding(0);
    const yScale = scaleLinear().range([0, 100]).domain([-30, 82]);
    const groupScale = scaleBand().range([0, xScale.bandwidth()]).domain(keys);

    const result = calculateGroupedBars(
      chartData,
      groupScale,
      keys,
      labelSelector,
      [],
      range,
      xScale,
      yScale,
      'vertical',
      colors
    );

    expect(result).toMatchSnapshot();
  });

  test('should calculate grouped bars correctly for horizontal layout', () => {
    const xScale = scaleLinear().range([0, 100]).domain([-30, 82]);
    const yScale = scaleBand()
      .range([0, 100])
      .domain(chartData.map((item: any) => item[labelSelector]).reverse())
      .padding(0);
    const groupScale = scaleBand().range([0, yScale.bandwidth()]).domain(keys);

    const result = calculateGroupedBars(
      chartData,
      groupScale,
      keys,
      labelSelector,
      [],
      range,
      xScale,
      yScale,
      'horizontal',
      colors
    );

    expect(result).toMatchSnapshot();
  });
});

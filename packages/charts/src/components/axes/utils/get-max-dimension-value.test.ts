import { scaleBand, scaleLinear } from 'd3-scale';
import { ScaleSettings } from '@keen.io/charts-utils';

import getMaxDimensionValue from './get-max-dimension-value';

test('returns the longest label from scale domain', () => {
  const scale = scaleBand().domain(['Marketing', 'IT', 'Sales']);
  const result = getMaxDimensionValue(scale);

  expect(result).toEqual('Marketing');
});

test('applies labels formatter from scale settings ', () => {
  const scaleSettings: ScaleSettings = {
    type: 'linear',
    formatLabel: (value: number) => value.toFixed(1),
  };
  const scale = scaleLinear().domain([0.5, 100.5]);
  const result = getMaxDimensionValue(scale, scaleSettings);

  expect(result).toEqual('100.5');
});

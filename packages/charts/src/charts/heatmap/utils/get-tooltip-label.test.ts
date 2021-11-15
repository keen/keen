import { scaleBand } from 'd3-scale';
import { ScaleSettings } from '@keen.io/charts-utils';

import { getTooltipLabel } from './get-tooltip-label';

test('returns scale label', () => {
  const scale = scaleBand().domain(['Poland', 'USA', 'Germany']);
  const scaleSettings: ScaleSettings = {
    type: 'band',
  };

  expect(
    getTooltipLabel({
      scale,
      settings: scaleSettings,
      index: 1,
    })
  ).toEqual('USA');
});

test('format label based on "time" scale settings', () => {
  const index = 0;
  const scale = scaleBand().domain([
    '2021-03-14T12:00:00.000Z',
    '2021-03-14T13:00:00.000Z',
  ]);
  const scaleSettings: ScaleSettings = {
    type: 'time',
    formatLabel: jest.fn().mockImplementation(() => '12:00'),
  };

  expect(
    getTooltipLabel({
      scale,
      index,
      settings: scaleSettings,
    })
  ).toEqual('12:00');
  expect(scaleSettings.formatLabel).toHaveBeenCalledWith(scale.domain()[index]);
});

import { getVisualizationIcon } from './get-visualization-icon';
import { PickerWidgets } from '../types';

test('returns visualization icon', () => {
  const visualization = {
    type: 'bar' as PickerWidgets,
    chartSettings: {},
  };
  const result = getVisualizationIcon(visualization);
  expect(result).toEqual('bar-widget-vertical');
});

test('returns visualization icon with proper layout', () => {
  const visualization = {
    type: 'bar' as PickerWidgets,
    chartSettings: {
      layout: 'horizontal',
    },
  };
  const result = getVisualizationIcon(visualization);
  expect(result).toEqual('bar-widget-horizontal');
});

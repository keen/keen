import { GroupMode, StackMode, CurveType } from '@keen.io/charts';

import { mergeOptions } from './merge-options';

import { LINE_CURVE_OPTIONS, MODE_OPTIONS } from '../constants';

test('merge visualization settings', () => {
  const activeSettings = 'default';
  const options = [LINE_CURVE_OPTIONS, MODE_OPTIONS];
  const currentSettings: {
    groupMode: GroupMode;
    stackMode: StackMode;
    curve: CurveType;
  } = {
    groupMode: 'grouped',
    curve: 'spline',
    stackMode: undefined,
  };

  const result = mergeOptions(activeSettings, options, currentSettings);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "curve": "spline",
      "groupMode": "grouped",
      "stackMode": undefined,
    }
  `);
});

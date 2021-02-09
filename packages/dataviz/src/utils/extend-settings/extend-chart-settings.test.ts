import { extendChartSettings } from './extend-chart-settings';

test('should merge chart settings created from query with base configuration', () => {
  const chartQuerySettings = {
    xScaleSettings: {
      type: 'time',
      precision: 'month',
    },
  };

  const baseSettings = {
    barsOrder: 'ascending',
    xScaleSettings: {
      steps: 10,
    },
  };

  expect(extendChartSettings(chartQuerySettings, baseSettings))
    .toMatchInlineSnapshot(`
    Object {
      "barsOrder": "ascending",
      "xScaleSettings": Object {
        "precision": "month",
        "steps": 10,
        "type": "time",
      },
    }
  `);
});

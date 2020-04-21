import { legendSettings, widgetSettings } from '../../widget-settings';

import { LegendSettings } from '../../types';

export const bubbleLegendSettings: LegendSettings = {
  ...legendSettings,
  position: 'right',
  alignment: 'right',
};

export const bubbleWidgetSettings = {
  ...widgetSettings,
  legend: {
    ...legendSettings,
    series: {
      ...legendSettings,
      layout: 'vertical',
      alignment: 'center',
    },
    bubble: bubbleLegendSettings,
  },
};

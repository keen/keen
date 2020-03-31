import { legendSettings, widgetSettings } from '../../widget-settings';

import { LegendSettings } from '../../types';

export const choroplethLegendSettings: LegendSettings = {
  ...legendSettings,
  layout: 'vertical',
  position: 'left',
};

export const choroplethWidgetSettings = {
  ...widgetSettings,
  legend: choroplethLegendSettings,
};

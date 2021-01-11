import { OptionsGroup, ChartSettings, WidgetSettings } from '../types';

export const mergeOptions = (
  id: string,
  chartOptions: OptionsGroup[],
  settings: ChartSettings | WidgetSettings
) => {
  const options = chartOptions.filter((group) => group.id !== id);

  const mergedSettings = options.reduce((acc, item) => {
    let groupSettings = {};
    item.settings.forEach(({ isActive, defaultValue }) => {
      if (isActive(settings)) {
        groupSettings = defaultValue;
      }
    });

    return {
      ...acc,
      ...groupSettings,
    };
  }, {});

  return mergedSettings;
};

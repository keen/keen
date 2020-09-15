import { ChartOptions, ChartSettings } from '../../../types';

export const mergeChartOptions = (
  id: string,
  chartOptions: ChartOptions[],
  settings: ChartSettings
) => {
  const options = chartOptions.filter(group => group.id !== id);
  const mergedSettings = options.reduce((acc, item) => {
    let groupSettings = {};
    item.settings.forEach(({ isActive, defaultSettings }) => {
      if (isActive(settings)) {
        groupSettings = defaultSettings;
      }
    });

    return {
      ...acc,
      ...groupSettings,
    };
  }, {});

  return mergedSettings;
};

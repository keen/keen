import { colors } from '@keen.io/colors';
import { LegendSettings } from './types';

export const legendSettings: LegendSettings = {
  enabled: true,
  position: 'top',
  alignment: 'left',
  layout: 'horizontal',
  typography: {
    fontSize: 11,
    fontFamily: 'Gangster Grotesk Regular, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontColor: colors.black['500'],
  },
  card: undefined,
};

export const widgetSettings = {
  legend: legendSettings,
};

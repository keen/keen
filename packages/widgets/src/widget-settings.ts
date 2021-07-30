import { colors } from '@keen.io/colors';
import { LegendSettings, WidgetSettings } from './types';

export const legendSettings: LegendSettings = {
  enabled: true,
  position: 'top',
  alignment: 'left',
  layout: 'horizontal',
  typography: {
    fontSize: 10,
    fontFamily: 'Gangster Grotesk, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontColor: colors.black['500'],
  },
  card: undefined,
  title: undefined,
};

export const widgetSettings: WidgetSettings = {
  legend: legendSettings,
  card: {
    backgroundColor: colors.white['500'],
    borderRadius: 0,
    hasShadow: true,
    enabled: true,
  },
  title: {
    content: '',
    typography: {
      fontSize: 20,
      fontFamily: 'Gangster Grotesk, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontColor: colors.blue['500'],
    },
  },
  subtitle: {
    content: '',
    typography: {
      fontSize: 14,
      fontFamily: 'Lato, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontColor: colors.black['500'],
    },
  },
};

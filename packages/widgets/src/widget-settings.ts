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
  title: undefined,
};

export const widgetSettings = {
  legend: legendSettings,
  card: {
    backgroundColor: colors.white['500'],
    borderRadius: '0px',
    border: 'none',
    hasShadow: true,
  },
  title: {
    typography: {
      fontSize: 20,
      fontFamily: 'Gangster Grotesk Regular, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontColor: colors.blue['500'],
    },
  },
  subtitle: {
    typography: {
      fontSize: 14,
      fontFamily: 'Lato Regular, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontColor: colors.black['500'],
    },
  },
};

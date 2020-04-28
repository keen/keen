import { colors } from '@keen.io/colors';
import { widgetSettings } from '../../widget-settings';
import { BubbleWidgetLegendSettings } from '../../types';

export const bubbleLegendSettings: BubbleWidgetLegendSettings = {
  position: 'left',
  series: {
    enabled: true,
    alignment: 'left',
    layout: 'vertical',
    typography: {
      fontSize: 11,
      fontFamily: 'Gangster Grotesk Regular, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontColor: colors.black['500'],
    },
    card: undefined,
    title: undefined,
  },
  bubble: {
    enabled: true,
    alignment: 'left',
    layout: 'vertical',
    typography: {
      fontSize: 11,
      fontFamily: 'Gangster Grotesk Regular, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontColor: colors.black['500'],
    },
    card: undefined,
    title: undefined,
  },
};

export const bubbleWidgetSettings = {
  ...widgetSettings,
  legend: bubbleLegendSettings,
};

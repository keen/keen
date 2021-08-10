import { colors } from '@keen.io/colors';

import { widgetSettings } from '../../widget-settings';

export const metricWidgetSettings = {
  card: {
    backgroundColor: colors.white['500'],
    borderRadius: '0px',
    border: 'none',
    hasShadow: true,
  },
  title: widgetSettings.title,
  subtitle: widgetSettings.subtitle,
};

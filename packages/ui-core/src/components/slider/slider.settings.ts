import { colors } from '@keen.io/colors';

import { ControlSettings } from './types';
import { Typography } from '../../types';

export const sliderControlSettings: ControlSettings = {
  size: 15,
  borderColor: colors.yellow['400'],
  backgroundColor: colors.white['500'],
};

export const tooltipTypography: Typography = {
  fontSize: 12,
  fontFamily: 'Lato Regular, sans-serif',
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontColor: colors.white['500'],
};

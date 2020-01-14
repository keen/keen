import { number, select, color } from '@storybook/addon-knobs';

import { colors } from '@keen.io/colors';
import { Typography } from '@keen.io/ui-core';

const options = {
  fontStyle: {
    normal: 'normal',
    italic: 'italic',
  },
  fontWeight: {
    normal: 'normal',
    bold: 'bold',
  },
  fontFamily: {
    GangsterGroteskBold: 'Gangster Grotesk Bold',
    GangsterGroteskLight: 'Gangster Grotesk Light',
    GangsterGroteskRegular: 'Gangster Grotesk Regular',
    LatoBold: 'Lato Bold',
    LatoLight: 'Lato Light',
    LatoRegular: 'Lato Regular',
  },
};

const typographyKnobs = (
  namespace: string,
  defaultOptions: Partial<Typography> = {}
) => ({
  fontFamily: select(
    'Font Family',
    options.fontFamily,
    defaultOptions.fontFamily || options.fontFamily.GangsterGroteskRegular,
    namespace
  ),
  fontSize: number('Font Size', defaultOptions.fontSize || 14, {}, namespace),
  fontStyle: select(
    'Font Style',
    options.fontStyle,
    defaultOptions.fontStyle || options.fontStyle.normal,
    namespace
  ) as 'normal' | 'italic',
  fontWeight: select(
    'Font Weight',
    options.fontWeight,
    defaultOptions.fontWeight || options.fontWeight.normal,
    namespace
  ) as 'normal' | 'bold',
  fontColor: color(
    'Font Color',
    defaultOptions.fontColor || colors.black['500'],
    namespace
  ),
});

export default typographyKnobs;

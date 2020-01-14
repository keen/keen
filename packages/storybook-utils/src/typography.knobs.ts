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
};

const typographyKnobs = (
  namespace: string,
  defaultOptions: Partial<Typography> = {}
) => ({
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

import { select, text } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

import { typographyKnobs } from './typography.knobs';

const xAxisTitleAlignment = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const yAxisTitleAlignment = {
  top: 'top',
  center: 'center',
  bottom: 'bottom',
};

export const xAxisTitleKnobs = (namespace: string) => ({
  value: text('Horizontal Title', 'Axis Title', namespace),
  alignment: select(
    'Horizontal Alignment',
    xAxisTitleAlignment,
    xAxisTitleAlignment.center,
    namespace
  ),
});

export const yAxisTitleKnobs = (namespace: string) => ({
  value: text('Vertical Title', 'Axis Title', namespace),
  alignment: select(
    'Vertical Alignment',
    yAxisTitleAlignment,
    yAxisTitleAlignment.center,
    namespace
  ),
});

export const axisTitleThemeKnobs = (namespace: string) =>
  typographyKnobs(namespace, {
    fontSize: 14,
    fontFamily: 'Lato Bold',
    fontColor: colors.blue['500'],
  });

import { select, boolean, number, color } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

import { typographyKnobs } from './typography.knobs';

const radiusAngleOptions = {
  '-90': -90,
  '-60': -60,
  '-45': -45,
  '-25': -25,
  '0': 0,
  '25': 25,
  '45': 45,
  '60': 60,
  '90': 90,
};

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

const createThemeColors = (
  defaultColors: string[]
): Record<string, string[]> => ({
  default: defaultColors,
  dracula: ['#50fa7b', '#ffb86c', '#6272a4', '#bd93f9', '#ff5555', '#f1fa8c'],
});

export const gridKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  color: color('Color', colors.gray['400'], namespace),
});

export const themeColorsKnobs = (
  namespace: string,
  defaultColors: string[]
) => {
  const colorPalette = createThemeColors(defaultColors);
  return select('Colors', colorPalette, colorPalette.default, `${namespace}`);
};

export const axisXKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  tickSize: number('Tick Size', 10, {}, namespace),
  padding: number('Padding', 5, {}, namespace),
  tickPadding: number('Tick Padding', 10, {}, namespace),
  stroke: number('Stroke', 1, {}, namespace),
  color: color('Line Color', colors.blue['100'], namespace),
  labels: {
    enabled: boolean('Show Labels', true, namespace),
    typography: typographyKnobs(namespace, { fontSize: 10 }),
    radiusAngle: select('Radius angle', radiusAngleOptions, 0, namespace),
  },
  title: {
    padding: number('Padding', 20, {}, `${namespace} Title`),
    alignment: select(
      'Title Alignment',
      xAxisTitleAlignment,
      xAxisTitleAlignment.center,
      `${namespace} Title`
    ),
    typography: typographyKnobs(`${namespace} Title`, {
      fontSize: 14,
      fontFamily: 'Lato Bold',
      fontColor: colors.blue['500'],
    }),
  },
});

export const axisYKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  tickSize: number('Tick Size', 0, {}, namespace),
  padding: number('Padding', 5, {}, namespace),
  tickPadding: number('Tick Padding', 10, {}, namespace),
  stroke: number('Stroke', 0, {}, namespace),
  color: color('Line Color', colors.blue['100'], namespace),
  labels: {
    enabled: boolean('Show Labels', true, namespace),
    typography: typographyKnobs(namespace, { fontSize: 10 }),
    radiusAngle: select('Radius angle', radiusAngleOptions, 0, namespace),
  },
  title: {
    padding: number('Padding', 20, {}, `${namespace} Title`),
    alignment: select(
      'Title Alignment',
      yAxisTitleAlignment,
      yAxisTitleAlignment.center,
      `${namespace} Title`
    ),
    typography: typographyKnobs(`${namespace} Title`, {
      fontSize: 14,
      fontFamily: 'Lato Bold',
      fontColor: colors.blue['500'],
    }),
  },
});

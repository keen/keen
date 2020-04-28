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

export const gridKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  color: color('Color', colors.gray['400'], namespace),
});

export const axisXKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  tickSize: number('Tick Size', 10, {}, namespace),
  tickPadding: number('Tick Padding', 10, {}, namespace),
  stroke: number('Stroke', 1, {}, namespace),
  color: color('Line Color', colors.blue['100'], namespace),
  labels: {
    enabled: boolean('Show Labels', true, namespace),
    typography: typographyKnobs(namespace, { fontSize: 10 }),
    radiusAngle: select('Radius angle', radiusAngleOptions, 0, namespace),
  },
});

export const axisYKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  tickSize: number('Tick Size', 0, {}, namespace),
  tickPadding: number('Tick Padding', 10, {}, namespace),
  stroke: number('Stroke', 0, {}, namespace),
  color: color('Line Color', colors.blue['100'], namespace),
  labels: {
    enabled: boolean('Show Labels', true, namespace),
    typography: typographyKnobs(namespace, { fontSize: 10 }),
    radiusAngle: select('Radius angle', radiusAngleOptions, 0, namespace),
  },
});

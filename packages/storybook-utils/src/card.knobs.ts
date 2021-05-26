import { boolean, color, number } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

export const cardKnobs = (namespace: string) => ({
  hasShadow: boolean('Shadow On / Off', true, namespace),
  borderRadius: number('Border Radius', 0, { min: 0, max: 30 }, namespace),
  backgroundColor: color('Background Color', colors.white['500'], namespace),
  borderColor: color('Border Color', colors.white['500'], namespace),
  borderWidth: number('Border Width', 0, { min: 0, max: 10 }, namespace),
  padding: number('Padding', 10, { min: 0, max: 35 }, namespace),
});

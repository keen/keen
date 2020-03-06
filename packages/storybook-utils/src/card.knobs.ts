import { text, boolean, color } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

export const cardKnobs = (namespace: string) => ({
  hasShadow: boolean('Shadow On / Off', true, namespace),
  border: text('Border', '', namespace),
  borderRadius: text('Border Radius', '0px', namespace),
  backgroundColor: color('Background Color', colors.white['500'], namespace),
});

import ColorPalette from './color-palette.component';
import * as React from 'react';
import { colors as styleColors } from '@keen.io/colors';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components /Color Palette',
  parameters: {
    component: ColorPalette,
    componentSubtitle: 'Set color palette',
  },
};

export const basic = () => {
  const colors = [
    styleColors.pink[300],
    styleColors.green[300],
    styleColors.blue[300],
    styleColors.red[300],
  ];
  const colorSuggestions = [
    ...colors,
    styleColors.yellow[300],
    styleColors.black[300],
    styleColors.purple[300],
    styleColors.orange[300],
  ];

  return (
    <ColorPalette
      colors={colors}
      colorSuggestions={colorSuggestions}
      onColorsChange={action('Colors changed')}
    />
  );
};

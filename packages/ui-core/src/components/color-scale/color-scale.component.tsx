import React from 'react';
import { colors as themeColors } from '@keen.io/colors';

import { ColorModeType } from '../../types';

import { ColorCard, ColorGradient } from './color-scale.styles';

type Props = {
  colors?: string[];
  colorMode?: ColorModeType;
};

const ColorScale = ({ colors, colorMode = 'shades' }: Props) => {
  const colorsArray =
    colors && colors.length
      ? colors.length > 1
        ? colors
        : ['white', colors[0]]
      : ['white', themeColors.lightBlue[500]];

  return (
    <>
      {colorMode === 'shades' || !colorsArray ? (
        <ColorGradient
          key={`${colorsArray[0]}-${colorsArray[1]}`}
          colors={colorsArray}
        />
      ) : (
        colorsArray.map(el => <ColorCard key={el} background={el} />)
      )}
    </>
  );
};

export default ColorScale;

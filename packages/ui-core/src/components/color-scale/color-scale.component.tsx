import React from 'react';
import { theme } from '@keen.io/charts';

import { ColorMode } from '../../types';

import { ColorCard, ColorGradient } from './color-scale.styles';

type Props = {
  colors?: string[];
  mode?: ColorMode;
};

const ColorScale = ({ colors = theme.colors, mode = 'continuous' }: Props) => {
  return (
    <>
      {mode === 'continuous' ? (
        <ColorGradient startColor={colors[0]} endColor={colors[1]} />
      ) : (
        colors.map(el => <ColorCard key={el} background={el} />)
      )}
    </>
  );
};

export default ColorScale;

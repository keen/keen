import React from 'react';
import { colors as theme } from '@keen.io/colors';

import { ColorMode } from '../../types';

import { ColorCard, ColorGradient } from './color-scale.styles';

type Props = {
  colors?: string[];
  mode?: ColorMode;
};

const ColorScale = ({
  colors = [
    theme.lightBlue[500],
    theme.orange[500],
    theme.yellow[500],
    theme.green[500],
    theme.pink[500],
  ],
  mode = 'continuous',
}: Props) => {
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

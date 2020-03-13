import React from 'react';
import { colors } from '@keen.io/colors';

export const GRADIENT_ID = 'HOVER_BAR_MASK';

const Gradient = () => (
  <defs>
    <linearGradient
      id={GRADIENT_ID}
      x1="100%"
      x2="0%"
      y1="67.625%"
      y2="67.625%"
    >
      <stop offset="0%" stopColor={colors.gray['200']} />
      <stop offset="47.54%" stopColor="#FEFEFE" stopOpacity=".572" />
      <stop offset="100%" stopColor={colors.gray['200']} />
    </linearGradient>
  </defs>
);

export default Gradient;

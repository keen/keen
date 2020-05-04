import React from 'react';
import { colors } from '@keen.io/colors';

export const GRADIENT_ID = 'HOVER_BAR_MASK';

type Props = {
  color?: string;
};

const Gradient = ({ color = colors.black['500'] }: Props) => (
  <defs>
    <linearGradient
      id={GRADIENT_ID}
      x1="100%"
      x2="0%"
      y1="67.625%"
      y2="67.625%"
    >
      <stop offset="0%" stopColor={color} stopOpacity=".8" />
      <stop offset="33.3%" stopColor={color} stopOpacity=".1" />
      <stop offset="66.6%" stopColor={color} stopOpacity=".1" />
      <stop offset="100%" stopColor={color} stopOpacity=".8" />
    </linearGradient>
  </defs>
);

export default Gradient;

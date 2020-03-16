import React, { FC } from 'react';
import { colors } from '@keen.io/colors';

import { Line } from '../elements';

type Props = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const HoverLine: FC<Props> = ({ x1, x2, y1, y2 }) => (
  <g color={colors.blue[500]} pointerEvents="none">
    <Line x1={x1} x2={x2} y1={y1} y2={y2} />
    <circle cx={x1} cy={y1} r="3" fill="currentColor" />
    <circle cx={x1} cy={y1} r="2" fill="white" />
    <circle cx={x2} cy={y2} r="3" fill="currentColor" />
    <circle cx={x2} cy={y2} r="2" fill="white" />
  </g>
);

export default HoverLine;

import React from 'react';

import { Bar } from './bar-chart.utils';

type Props = {
  bars: Bar[];
};

const Bars = ({ bars }: Props) => (
  <g>
    {bars.map(({ key, x, y, width, height, color }: Bar) => (
      <rect key={key} x={x} y={y} height={height} width={width} fill={color} />
    ))}
  </g>
);

export default Bars;

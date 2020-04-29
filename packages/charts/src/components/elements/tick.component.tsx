import React, { memo } from 'react';

import { Orientation } from '../../types';

type Props = {
  x: number;
  y: number;
  size: number;
  orientation: Orientation;
  color?: string;
  children?: React.ReactNode;
};

const Tick = ({
  x,
  y,
  orientation,
  size,
  color = 'currentColor',
  children,
}: Props) => {
  const linePosition =
    orientation === Orientation.HORIZONTAL ? size : -Math.abs(size);

  const position = {
    [orientation === Orientation.HORIZONTAL ? 'y2' : 'x2']: linePosition,
  };

  return (
    <g transform={`translate(${x}, ${y})`}>
      <line stroke={color} {...position}></line>
      {children}
    </g>
  );
};

export default memo(Tick);

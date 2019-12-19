import React, { memo } from 'react';

import { Orientation } from '../../types';

type Props = {
  x: number;
  y: number;
  size: number;
  orientation: Orientation;
  children?: React.ReactNode;
};

const Tick = ({ x, y, orientation, size, children }: Props) => {
  const linePosition =
    orientation === Orientation.VERTICAL ? size : -Math.abs(size);

  const position = {
    [orientation === Orientation.VERTICAL ? 'y2' : 'x2']: linePosition,
  };

  return (
    <g transform={`translate(${x}, ${y})`}>
      <line stroke="currentColor" {...position}></line>
      {children}
    </g>
  );
};

export default memo(Tick);

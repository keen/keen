import React, { FC, memo } from 'react';

type Props = {
  filterId: string;
  firstOpacity: number;
  lastOpacity: number;
  color: string;
};

const GradientFilter: FC<Props> = ({
  filterId,
  color,
  firstOpacity,
  lastOpacity,
}) => (
  <linearGradient id={filterId} x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" style={{ stopColor: color, stopOpacity: firstOpacity }} />
    <stop
      offset="100%"
      style={{ stopColor: color, stopOpacity: lastOpacity }}
    />
  </linearGradient>
);

export default memo(GradientFilter);

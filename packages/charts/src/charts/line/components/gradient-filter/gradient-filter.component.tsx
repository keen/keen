import React, { FC, memo } from 'react';

type Props = {
  filterId: string;
  positiveColor: string;
  zeroPointColor: string;
  negativeColor: string;
  gradientZeroPercent: number;
};

const GradientFilter: FC<Props> = ({
  filterId,
  positiveColor,
  zeroPointColor,
  negativeColor,
  gradientZeroPercent,
}) => (
  <linearGradient id={filterId} x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" style={{ stopColor: positiveColor }} />
    <stop
      offset={`${gradientZeroPercent}%`}
      style={{ stopColor: zeroPointColor }}
    />
    <stop offset="100%" style={{ stopColor: negativeColor }} />
  </linearGradient>
);

export default memo(GradientFilter);

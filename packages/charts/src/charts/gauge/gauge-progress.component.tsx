import React, { FC } from 'react';
import { Typography } from '@keen.io/ui-core';

import { formatNumber } from '../../utils/format.utils';

type Props = {
  progressType?: 'normal' | 'percent';
  typography: Typography;
  maximum: number;
  value: number;
};

const GaugeProgress: FC<Props> = ({
  progressType,
  value,
  maximum,
  typography,
}) => {
  const { fontColor, ...valueStyles } = typography;

  return (
    <text fill={fontColor} textAnchor="middle" style={valueStyles}>
      {progressType === 'percent' ? (
        <>
          {formatNumber((value / maximum) * 100)}
          <tspan
            style={{
              fontSize: valueStyles.fontSize / 2,
            }}
          >
            %
          </tspan>
        </>
      ) : (
        value
      )}
    </text>
  );
};

export default GaugeProgress;

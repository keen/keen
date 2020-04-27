import React, { FC } from 'react';
import { Typography } from '@keen.io/ui-core';

import { formatNumber } from '../../utils/format.utils';

type Props = {
  typography: Typography;
  maximum: number;
  value: number;
  progressType?: 'normal' | 'percent';
  formatValue?: (value: string | number) => React.ReactNode;
};

const GaugeProgress: FC<Props> = ({
  progressType,
  value,
  maximum,
  typography,
  formatValue,
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
      ) : formatValue ? (
        formatValue(value)
      ) : (
        value
      )}
    </text>
  );
};

export default GaugeProgress;

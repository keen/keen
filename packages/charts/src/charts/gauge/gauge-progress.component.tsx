import React, { FC, useState, useEffect } from 'react';
import { interpolateNumber } from 'd3-interpolate';
import { useMotionValue, useSpring } from 'framer-motion';
import { Typography } from '@keen.io/ui-core';
import {
  formatNumber,
  Formatter,
  formatValue as valueFormatter,
} from '@keen.io/charts-utils';
import { ProgressType } from './types';

const springMotion = {
  from: 0,
  to: 1,
  velocity: 10,
  damping: 50,
};

type Props = {
  typography: Typography;
  minimum: number;
  maximum: number;
  value: number;
  progressType?: ProgressType;
  formatValue?: Formatter;
  isAutoApplied: boolean;
};

const GaugeProgress: FC<Props> = ({
  progressType,
  value,
  minimum,
  maximum,
  typography,
  formatValue,
  isAutoApplied,
}) => {
  const initialValue = useMotionValue(minimum);
  const [progressValue, setProgressValue] = useState(minimum);
  const spring = useSpring(initialValue, springMotion);

  useEffect(() => {
    const interpolator = interpolateNumber(minimum, value);
    spring.onChange((v) => setProgressValue(Math.round(interpolator(v))));
    initialValue.set(value);

    return () => spring.destroy();
  }, [value]);

  const { fontColor, ...valueStyles } = typography;

  const isValidPercentageValue =
    !isAutoApplied &&
    typeof minimum === 'number' &&
    typeof maximum === 'number' &&
    minimum !== maximum;

  return (
    <text fill={fontColor} textAnchor="middle" style={valueStyles}>
      {progressType === 'percent' ? (
        <>
          {isValidPercentageValue
            ? formatNumber(
                ((progressValue - minimum) / (maximum - minimum)) * 100
              )
            : 100}
          <tspan
            style={{
              fontSize: valueStyles.fontSize / 2,
            }}
          >
            %
          </tspan>
        </>
      ) : formatValue ? (
        valueFormatter(progressValue, formatValue)
      ) : (
        progressValue
      )}
    </text>
  );
};

export default GaugeProgress;

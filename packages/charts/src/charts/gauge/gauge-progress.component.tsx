import React, { FC, useState, useEffect } from 'react';
import { interpolateNumber } from 'd3-interpolate';
import { useMotionValue, useSpring } from 'framer-motion';
import { Typography } from '@keen.io/ui-core';
import {
  formatNumber,
  Formatter,
  formatValue as valueFormatter,
} from '@keen.io/charts-utils';

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
  progressType?: 'normal' | 'percent';
  formatValue?: Formatter;
};

const GaugeProgress: FC<Props> = ({
  progressType,
  value,
  minimum,
  maximum,
  typography,
  formatValue,
}) => {
  const initialValue = useMotionValue(minimum);
  const [progressValue, setProgressValue] = useState(minimum);
  const spring = useSpring(initialValue, springMotion);

  useEffect(() => {
    const interpolator = interpolateNumber(minimum, value);
    spring.onChange((v) => setProgressValue(Math.round(interpolator(v))));
    initialValue.set(value);
  }, []);

  const { fontColor, ...valueStyles } = typography;

  return (
    <text fill={fontColor} textAnchor="middle" style={valueStyles}>
      {progressType === 'percent' ? (
        <>
          {formatNumber((progressValue / maximum - minimum) * 100)}
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

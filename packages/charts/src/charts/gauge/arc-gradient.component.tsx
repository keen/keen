import React, { FC } from 'react';
import { range } from 'd3-array';

export const GRADIENT_ID = '@keen.io/gauge-gradient';

type Props = {
  id?: string;
  steps: number;
  colors: string[];
};

const ArcGradient: FC<Props> = ({ id = GRADIENT_ID, colors, steps }) => {
  const gradientTransitions = range(0, 100, 100 / steps);

  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
        {gradientTransitions.map((value, idx) => (
          <stop
            key={idx}
            offset={`${value}%`}
            style={{ stopColor: colors[idx], stopOpacity: 1 }}
          />
        ))}
      </linearGradient>
    </defs>
  );
};

export default ArcGradient;

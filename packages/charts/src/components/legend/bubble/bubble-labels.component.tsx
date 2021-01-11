import React, { FC } from 'react';
import { Typography } from '@keen.io/ui-core';
import {
  sortByValue,
  legendRadius,
  verticalPositionScale,
  radiusScale,
} from './bubble-legend.utils';

type Props = {
  domain: [number, number];
  minRadius: number;
  maxRadius: number;
  typography?: Typography;
};

export const Labels: FC<Props> = ({
  domain,
  typography,
  minRadius,
  maxRadius,
}) => {
  const sortedDomain = sortByValue(domain);
  const maxRange = Math.max(...legendRadius);

  const [, max] = sortedDomain;

  const { fontColor, ...textStyles } = typography;

  const verticalPosition = verticalPositionScale(maxRange);
  const legendValue = radiusScale(minRadius, maxRadius, max);

  return (
    <>
      {legendRadius.map((radius) => {
        const x = maxRange;
        const y = typography?.fontSize
          ? maxRange * 2 - verticalPosition(radius) + typography?.fontSize
          : maxRange * 2 - verticalPosition(radius);
        return (
          <text
            key={radius}
            x={x}
            y={y}
            dominantBaseline="ideographic"
            textAnchor="middle"
            fill={fontColor}
            style={{ ...textStyles }}
          >
            {Math.floor(legendValue(radius))}
          </text>
        );
      })}
    </>
  );
};

export default Labels;

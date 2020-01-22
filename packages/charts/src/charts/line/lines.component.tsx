import React from 'react';

import { Lines } from './line-chart.utils';

import Marks from './marks.component';

type Props = {
  lines: Lines[];
};

const Lines = ({ lines }: Props) => {
  return (
    <>
      {lines.map(
        (
          { key, line, marks, color, markRadius, strokeWidth }: Lines,
          idx: number
        ) => (
          <g key={`${key}`}>
            <path
              key={line.key}
              d={line.d}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <Marks
              key={`${idx}.${key}.marks`}
              marks={marks}
              color={color}
              markRadius={markRadius}
            />
          </g>
        )
      )}
    </>
  );
};

export default Lines;

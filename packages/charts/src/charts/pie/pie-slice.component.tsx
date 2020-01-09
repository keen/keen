import React, { FC, memo, useState } from 'react';
import { Arc } from 'd3-shape';

import { ColorAdjuster } from '@keen/ui-core';

import { StyledPath } from './pie-slice.styles';

type Props = {
  startAngle: number;
  endAngle: number;
  draw: Arc<any, any>;
  drawActive: Arc<any, any>;
  getLabelPosition: (start: number, end: number) => [number, number];
  label: string;
  color: string;
};

const PieSlice: FC<Props> = memo(
  ({
    startAngle,
    endAngle,
    draw,
    drawActive,
    color,
    getLabelPosition,
    label,
  }) => {
    const [active, setActive] = useState(false);
    const [path, setPath] = useState(
      draw({
        startAngle,
        endAngle,
      })
    );

    return (
      <g
        onMouseEnter={() => {
          setPath(
            drawActive({
              startAngle,
              endAngle,
            })
          );
          setActive(true);
        }}
        onMouseLeave={() => {
          setPath(
            draw({
              startAngle,
              endAngle,
            })
          );
          setActive(false);
        }}
      >
        <StyledPath fill={color} d={path} dropShadow={active} />
        <ColorAdjuster baseColor={color}>
          {adjustedColor => {
            return (
              <text
                fill={adjustedColor}
                transform={`translate(${getLabelPosition(
                  startAngle,
                  endAngle
                )})`}
                style={{ textAnchor: 'middle' }}
              >
                {label}
              </text>
            );
          }}
        </ColorAdjuster>
      </g>
    );
  }
);

PieSlice.displayName = 'PieSlice';

export default PieSlice;

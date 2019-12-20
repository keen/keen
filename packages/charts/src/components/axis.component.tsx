import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ScaleBand, ScaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

import { AxisSettins } from '../types';

export enum Orientation {
  BOTTOM = 'bottom',
  LEFT = 'left',
}

type Props = Omit<AxisSettins, 'enabled'> & {
  orientation: Orientation;
  scale: ScaleBand<string> | ScaleLinear<number, number>;
  x: number;
  y: number;
  lineEnabled?: boolean;
};

const AXIS_MODIFIERS = {
  bottom: axisBottom,
  left: axisLeft,
};

const StyledAxis = styled.g<{
  x: number;
  y: number;
  lineEnabled: boolean;
}>`
  transform: translate(${props => props.x + 'px'}, ${props => props.y + 'px'});
  path {
    display: ${props => (props.lineEnabled ? 'block' : 'none')};
  }
`;

const Axis = ({
  orientation,
  scale,
  tickSize,
  tickPadding,
  x,
  y,
  lineEnabled = true,
}: Props) => {
  const el = useRef(null);

  useEffect(() => {
    select(el.current).call(
      AXIS_MODIFIERS[orientation](scale as any)
        .tickSize(tickSize)
        .tickPadding(tickPadding)
    );
  });

  return <StyledAxis lineEnabled={lineEnabled} x={x} y={y} ref={el} />;
};

export default Axis;

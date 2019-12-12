import React, { useRef, useEffect } from 'react';
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
};

const AXIS_MODIFIERS = {
  bottom: axisBottom,
  left: axisLeft,
};

const Axis = ({ orientation, scale, tickSize, tickPadding, x, y }: Props) => {
  const el = useRef(null);

  useEffect(() => {
    select(el.current)
      .attr('transform', `translate(${x}, ${y})`)
      .call(
        AXIS_MODIFIERS[orientation](scale as any)
          .tickSize(tickSize)
          .tickPadding(tickPadding)
      );
  });

  return <g ref={el} />;
};

export default Axis;

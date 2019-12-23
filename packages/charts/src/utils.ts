import { ScaleBand, ScaleLinear } from 'd3-scale';

import { Tick, Orientation } from './types';

const TICK_ALIGN = 0.5;

export const EDGE_TICK_ALIGN = 4;

export const getCenterPosition = (scale: ScaleBand<string>) => {
  const offset = scale.bandwidth() / 2;
  return (value: string) => scale(value) + offset;
};

export const getScaleValues = (
  scale: ScaleBand<string> | ScaleLinear<number, number>
) => ('bandwidth' in scale ? scale.domain() : scale.ticks());

export const generateTicks = ({
  scale,
  tickSize,
  orientation = Orientation.VERTICAL,
  x,
  y,
}: {
  x: number;
  y: number;
  tickSize: number;
  scale: ScaleBand<string> | ScaleLinear<number, number>;
  orientation?: Orientation;
}): Tick[] => {
  const values = getScaleValues(scale);
  const ticks: Tick[] = [];
  const position = 'bandwidth' in scale ? getCenterPosition(scale) : scale;

  const getX = (value: string & { valueOf(): number }) =>
    orientation === Orientation.VERTICAL ? position(value) : x + TICK_ALIGN;

  const getY = (value: string & { valueOf(): number }) =>
    orientation === Orientation.VERTICAL ? y - TICK_ALIGN : position(value);

  values.forEach((value: any) =>
    ticks.push({
      size: tickSize,
      text: value,
      x: getX(value),
      y: getY(value),
    })
  );

  if ('bandwidth' in scale) {
    const [scaleStart, scaleEnd] = scale.range();

    ticks.push(
      {
        size: tickSize + EDGE_TICK_ALIGN,
        x: orientation === Orientation.VERTICAL ? scaleStart : x + TICK_ALIGN,
        y: orientation === Orientation.VERTICAL ? y - TICK_ALIGN : scaleStart,
      },
      {
        size: tickSize + EDGE_TICK_ALIGN,
        x: orientation === Orientation.VERTICAL ? scaleEnd : x + TICK_ALIGN,
        y: orientation === Orientation.VERTICAL ? y - TICK_ALIGN : scaleEnd,
      }
    );
  }

  return ticks;
};

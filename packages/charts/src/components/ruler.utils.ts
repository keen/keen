import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import { generateTicks } from '../utils';

import { Orientation, ScaleSettings, LabelRotation } from '../types';

type Options = {
  x: number;
  y: number;
  tickSize: number;
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation: Orientation;
  scaleSettings?: ScaleSettings;
  formatLabel?: (label: string | number) => string | number;
};

export const createRuler = ({
  x,
  y,
  tickSize,
  scale,
  orientation,
  scaleSettings,
}: Options) => {
  const [scaleStart, scaleEnd] = scale.range();
  const ticks = generateTicks({
    x,
    y,
    tickSize,
    scale,
    scaleSettings,
    orientation,
  });
  let line;

  if (orientation === Orientation.VERTICAL) {
    line = {
      x1: scaleStart,
      x2: scaleEnd,
      y1: y,
      y2: y,
    };
  } else {
    line = {
      x1: x,
      x2: x,
      y1: scaleStart,
      y2: scaleEnd,
    };
  }

  return {
    line,
    ticks,
  };
};

export const rotateLabel = (
  orientation: string,
  radiusAngle: number,
  tickPadding: number,
  tickSize: number
): LabelRotation => {
  const labelTransform = {
    anchor: radiusAngle > 0 ? 'start' : 'end',
    radius: radiusAngle,
  };
  if (radiusAngle) {
    if (orientation === Orientation.HORIZONTAL) {
      switch (radiusAngle) {
        case 90:
          return {
            ...labelTransform,
            translateX: -tickPadding + 5,
            translateY: tickPadding / 2,
          };

        case -90:
          return {
            ...labelTransform,
            translateX: -tickPadding / 2,
            translateY: -tickPadding - 5,
          };

        case -60:
          return {
            ...labelTransform,
            translateX: tickPadding / 2 - 2,
            translateY: -tickPadding,
          };

        default:
          return radiusAngle < 0
            ? {
                ...labelTransform,
                translateX: tickPadding / 2,
                translateY: -tickPadding / 2 - 2,
              }
            : {
                ...labelTransform,
                translateX: -tickPadding + 5,
                translateY: 0,
              };
      }
    } else {
      switch (radiusAngle) {
        case 90:
          return {
            ...labelTransform,
            translateX: tickPadding + tickSize - 4,
            translateY: tickPadding + tickSize - 2,
          };

        case -90:
          return {
            ...labelTransform,
            translateX: -(tickPadding + tickSize) + 2,
            translateY: tickPadding + tickSize - 5,
          };

        case -25:
          return {
            ...labelTransform,
            translateX: -tickPadding + 5,
            translateY: tickPadding - 5,
          };

        default:
          return radiusAngle < 0
            ? {
                ...labelTransform,
                translateX: -tickPadding,
                translateY: tickPadding - 5,
              }
            : {
                ...labelTransform,
                translateX: tickPadding - 5,
                translateY: tickPadding - 5,
              };
      }
    }
  }
  return {
    anchor: 'middle',
    radius: 0,
    translateX: 0,
    translateY: 0,
  };
};

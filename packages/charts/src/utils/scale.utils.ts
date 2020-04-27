import { ScaleLinear, ScaleBand, ScaleTime, scaleOrdinal } from 'd3-scale';
import {
  timeDay,
  timeMinute,
  timeMonth,
  timeWeek,
  timeHour,
  timeYear,
  CountableTimeInterval,
} from 'd3-time';

import { formatText } from './format.utils';

import { Tick, Orientation, ScaleSettings, TimePrecision } from '../types';

const TICK_ALIGN = 0.5;

export const EDGE_TICK_ALIGN = 4;

const timeModifier: Record<TimePrecision, CountableTimeInterval> = {
  day: timeDay,
  minute: timeMinute,
  hour: timeHour,
  week: timeWeek,
  month: timeMonth,
  year: timeYear,
};

export const getTimeScaleValues = (
  scale: ScaleTime<number, number>,
  { precision }: ScaleSettings
) => {
  const [startDate, endDate] = scale.domain() as Date[];
  const ticks = timeModifier[precision].count(startDate, endDate);
  return scale.ticks(ticks);
};

export const getScaleValues = (
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>,
  scaleSettings?: ScaleSettings
) => {
  if ('bandwidth' in scale) return scale.domain();
  if (scaleSettings?.type === 'time') {
    return getTimeScaleValues(
      scale as ScaleTime<number, number>,
      scaleSettings
    );
  }

  return scale.ticks();
};

export const getCenterPosition = (scale: ScaleBand<string>) => {
  const offset = scale.bandwidth() / 2;
  return (value: string) => scale(value) + offset;
};

export const generateTicks = ({
  scale,
  tickSize,
  orientation = Orientation.HORIZONTAL,
  scaleSettings,
  x,
  y,
}: {
  x: number;
  y: number;
  tickSize: number;
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation?: Orientation;
  scaleSettings?: ScaleSettings;
}): Tick[] => {
  const values = getScaleValues(scale, scaleSettings);

  const ticks: Tick[] = [];
  const position = 'bandwidth' in scale ? getCenterPosition(scale) : scale;

  const getX = (value: string & { valueOf(): number }) =>
    orientation === Orientation.HORIZONTAL ? position(value) : x + TICK_ALIGN;

  const getY = (value: string & { valueOf(): number }) =>
    orientation === Orientation.HORIZONTAL ? y - TICK_ALIGN : position(value);

  values.forEach((value: any) => {
    ticks.push({
      size: tickSize,
      text: formatText(value, scaleSettings),
      x: getX(value),
      y: getY(value),
    });
  });

  if ('bandwidth' in scale && orientation === Orientation.HORIZONTAL) {
    const [scaleStart, scaleEnd] = scale.range();

    ticks.push(
      {
        size: tickSize + EDGE_TICK_ALIGN,
        x: scaleStart,
        y: y - TICK_ALIGN,
      },
      {
        size: tickSize + EDGE_TICK_ALIGN,
        x: scaleEnd,
        y: y - TICK_ALIGN,
      }
    );
  }

  return ticks;
};

export const calculateScaleDomain = (
  scale: ScaleLinear<number, number>,
  minimum: number,
  maximum: number
) => {
  const ticks = scale.ticks();
  const ticksLength = ticks.length;
  const tickSize = ticks[1] - ticks[0];

  if (maximum > ticks[ticksLength - 1]) {
    const difference = Math.ceil(maximum / ticksLength);
    const newMaximum =
      difference > tickSize ? ticksLength * difference : ticksLength * tickSize;
    scale.domain([minimum, newMaximum]);
  }
};

export const bubbleColorScale = (colors: string[]) => scaleOrdinal(colors);

import { arc, DefaultArcObject } from 'd3-shape';
import { min, sum } from 'd3-array';
import { ColorMode } from '@keen.io/ui-core';
import { convertDegreesToRadians } from '@keen.io/charts-utils';

import { calculateColorScale } from '../../../utils/colors.utils';

import {
  MAX_DEGREES,
  INNER_WIDTH,
  OUTER_WIDTH,
  DEFAULT_MIN,
  DEFAULT_MAX,
} from '../constants';

import { InnerArc } from '../types';
import { Dimension, Margins } from '../../../types';

type Options = {
  data: Record<string, any>[];
  valueKey: string;
  dimension: Dimension;
  margins: Margins;
  colors: string[];
  startAngle: number;
  endAngle: number;
  colorMode: ColorMode;
  colorSteps: number;
  minValue: number | 'auto';
  maxValue: number | 'auto';
};

export const generateGauge = ({
  data,
  valueKey,
  dimension,
  margins,
  startAngle,
  endAngle,
  minValue,
  maxValue,
  colors,
  colorMode,
  colorSteps,
}: Options) => {
  const { width, height } = dimension;
  const radius = min([
    width / 2 - margins.left - margins.right,
    height / 2 - margins.top - margins.bottom,
  ]);

  const progressValue = sum(data.map((item) => item[valueKey]));
  const minimum = minValue === 'auto' ? DEFAULT_MIN : minValue;
  const maximum = maxValue === 'auto' ? DEFAULT_MAX : maxValue;

  const colorMin = colorMode === 'discrete' ? minimum : startAngle;
  const colorMax = colorMode === 'discrete' ? maximum : endAngle;

  const getColor = calculateColorScale(
    colorMin,
    colorMax,
    colorMode,
    colorSteps,
    colors
  );

  const arcStartAngle = convertDegreesToRadians(startAngle);
  const arcEndAngle = convertDegreesToRadians(endAngle);

  const arcProperties = {
    startAngle: arcStartAngle,
    endAngle: arcEndAngle,
  } as DefaultArcObject;

  const drawInnerArcPath = arc()
    .innerRadius(radius - INNER_WIDTH)
    .outerRadius(radius - OUTER_WIDTH);

  const innerArcs: InnerArc[] = [];
  const maximumValue = maximum - minimum;

  const currentPercent = ((progressValue - minimum) / maximumValue) * 100;
  const arcRange = Math.abs(startAngle) + endAngle;

  const progressMaxAngle =
    currentPercent >= 100
      ? endAngle
      : startAngle + Math.round((currentPercent * arcRange) / 100);

  for (let i = startAngle; i <= progressMaxAngle - 1; i++) {
    const props = {
      startAngle: convertDegreesToRadians(i),
      endAngle: convertDegreesToRadians(i + 1),
    } as DefaultArcObject;

    const path = drawInnerArcPath(props);
    innerArcs.push({
      path,
      color: getColor(colorMode === 'discrete' ? progressValue : i),
      value:
        minimum +
        (Math.round(((i + endAngle) / arcRange) * 100) * maximumValue) / 100,
    });
  }

  const outerArcPath = arc()
    .innerRadius(radius - OUTER_WIDTH)
    .outerRadius(radius)(arcProperties);

  const emptySpaceArcPath = arc()
    .innerRadius(radius - OUTER_WIDTH)
    .outerRadius(radius)({
    startAngle: arcEndAngle,
    endAngle: convertDegreesToRadians(MAX_DEGREES - endAngle),
  } as DefaultArcObject);

  return {
    innerArcs,
    minimum,
    maximum,
    progressValue,
    emptySpaceArcPath,
    outerArcPath,
  };
};

import { scaleLinear } from 'd3-scale';
import { arc, DefaultArcObject } from 'd3-shape';
import { min, sum } from 'd3-array';
import { ColorMode } from '@keen.io/ui-core';

import { convertDegreesToRadians } from '../../../utils/math.utils';
import { calculateColorScale } from '../../../utils/colors.utils';

import {
  ALIGN_STROKE,
  MAX_DEGREES,
  INNER_WIDTH,
  OUTER_WIDTH,
  DEFAULT_MIN,
  DEFAULT_MAX,
} from '../constants';

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

  const progressValue = sum(data.map(item => item[valueKey]));
  const minimum = minValue === 'auto' ? DEFAULT_MIN : minValue;
  const maximum = maxValue === 'auto' ? DEFAULT_MAX : maxValue;

  const getColor = calculateColorScale(
    minimum,
    maximum,
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

  const degreesScale = scaleLinear()
    .domain([minimum, maximum])
    .range([startAngle, endAngle]);

  const drawInnerArcPath = arc()
    .innerRadius(radius - INNER_WIDTH)
    .outerRadius(radius - OUTER_WIDTH);

  const maskPath = arc()
    .innerRadius(radius - INNER_WIDTH - ALIGN_STROKE)
    .outerRadius(radius - OUTER_WIDTH)
    .startAngle(convertDegreesToRadians(degreesScale(progressValue)))
    .endAngle(convertDegreesToRadians(endAngle + ALIGN_STROKE))(
    {} as DefaultArcObject
  );

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
    getColor,
    minimum,
    maximum,
    progressValue,
    emptySpaceArcPath,
    maskPath,
    innerArcProperties: arcProperties,
    drawInnerArcPath,
    outerArcPath,
    innerArcColor: getColor(progressValue),
  };
};

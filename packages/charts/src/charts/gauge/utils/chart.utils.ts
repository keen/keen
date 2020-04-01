import { scaleLinear } from 'd3-scale';
import { arc, DefaultArcObject } from 'd3-shape';
import { min, sum } from 'd3-array';
import { ColorMode } from '@keen.io/ui-core';

import { convertDegreesToRadians } from '../../../utils/math.utils';
import { calculateColorScale } from '../../../utils/colors.utils';

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
  maxValue: number;
};

export const generateGauge = ({
  data,
  valueKey,
  dimension,
  margins,
  startAngle,
  endAngle,
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
  const getColor = calculateColorScale(
    0,
    maxValue,
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
    .domain([0, maxValue])
    .range([startAngle, endAngle]);

  const innerArcPath = arc()
    .innerRadius(radius - 30)
    .outerRadius(radius - 10)(arcProperties);

  const maskPath = arc()
    .innerRadius(radius - 31)
    .outerRadius(radius - 10)
    .startAngle(convertDegreesToRadians(degreesScale(progressValue)))
    .endAngle(arcEndAngle)({} as DefaultArcObject);

  const outerArcPath = arc()
    .innerRadius(radius - 10)
    .outerRadius(radius)(arcProperties);

  return {
    getColor,
    maskPath,
    innerArcPath,
    outerArcPath,
    innerArcColor: getColor(progressValue),
  };
};

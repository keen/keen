import { scaleLinear, scaleOrdinal } from 'd3-scale';

import { calculateScaleDomain } from '../../../utils/scale.utils';
import { calculateRange } from '../../../utils/data';

import { Dimension, Margins } from '../../../types';

import { Bubble } from '../types';

type Options = {
  data: Record<string, any>[];
  dimension: Dimension;
  margins: Margins;
  colors: string[];
  minAreaRadius: number;
  maxAreaRadius: number;
  valueKey: string;
  xDomainKey: string;
  yDomainKey: string;
  labelSelector: string;
  disabledKeys: string[];
};

const createScale = ({
  data,
  range,
  key,
}: {
  data: Record<string, any>[];
  range: [number, number];
  key: string;
}) => {
  const { minimum, maximum } = calculateRange(data, 'auto', 'auto', [key]);
  const scale = scaleLinear()
    .domain([minimum, maximum])
    .range(range);
  calculateScaleDomain(scale, minimum, maximum);

  return {
    scale,
    middlePoint: scale(maximum / 2),
  };
};

export const generateBubbles = ({
  data,
  margins,
  dimension,
  colors,
  labelSelector,
  disabledKeys,
  valueKey,
  xDomainKey,
  yDomainKey,
  minAreaRadius,
  maxAreaRadius,
}: Options) => {
  const bubbles: Bubble[] = [];

  const colorScale = scaleOrdinal(colors);

  const { scale: xScale, middlePoint: xScalePoint } = createScale({
    data,
    key: xDomainKey,
    range: [margins.left, dimension.width - margins.right],
  });

  const { scale: yScale, middlePoint: yScalePoint } = createScale({
    data,
    key: yDomainKey,
    range: [dimension.height - margins.bottom, margins.top],
  });

  const { minimum, maximum } = calculateRange(data, 'auto', 'auto', [valueKey]);
  const radiusScale = scaleLinear()
    .domain([minimum, maximum])
    .range([minAreaRadius, maxAreaRadius]);

  data.forEach((item, idx) => {
    const label = item[labelSelector];
    const color = colorScale(label);
    if (disabledKeys && !disabledKeys.includes(label)) {
      const bubble = {
        key: `${label}-${idx}`,
        x: xScale(item[xDomainKey]),
        y: yScale(item[yDomainKey]),
        color,
        selector: [idx],
        radius: radiusScale(item[valueKey]),
      };
      bubbles.push(bubble);
    }
  });

  return {
    bubbles: bubbles.sort((a, b) => b.radius - a.radius),
    xScale,
    yScale,
    middlePoint: [xScalePoint, yScalePoint] as [number, number],
  };
};

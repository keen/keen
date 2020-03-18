import { geoMercator, geoPath, ExtendedFeatureCollection } from 'd3-geo';
import { ColorMode } from '@keen.io/ui-core';

import { calculateColorScale } from '../../../utils/colors.utils';
import { calculateRange } from '../../../utils/data.utils';

import { Dimension, Margins } from '../../../types';

type Options = {
  dimension: Dimension;
  margins: Margins;
  topology: ExtendedFeatureCollection;
  geoKey: string;
  colorMode: ColorMode;
  steps: number;
  valueKey: string;
  colors: string[];
  data: Record<string, any>[];
};

type GeoPropety = {
  index: number;
  data: Record<string, any>;
};

export const generateChoropleth = ({
  data,
  geoKey,
  valueKey,
  colorMode,
  colors,
  steps,
  dimension,
  topology,
}: Options) => {
  const geoData = new Map<string, GeoPropety>();
  const { width, height } = dimension;

  const { minimum, maximum } = calculateRange(data, 'auto', 'auto', [valueKey]);
  const getColor = calculateColorScale(
    minimum,
    maximum,
    colorMode,
    steps,
    colors
  );

  data.forEach((item, idx) => {
    const key = item[geoKey];
    geoData.set(key, {
      index: idx,
      data: item,
    });
  });

  const projection = geoMercator().fitSize([width, height], topology);
  const drawPath = geoPath().projection(projection);

  return {
    drawPath,
    getColor,
    geoData,
  };
};

import {
  geoMercator,
  geoOrthographic,
  geoGraticule,
  geoAzimuthalEqualArea,
  geoPath,
  GeoProjection,
  ExtendedFeatureCollection,
} from 'd3-geo';
import { ColorMode } from '@keen.io/ui-core';

import { calculateColorScale } from '../../../utils/colors.utils';
import { calculateRange } from '../../../utils/data.utils';

import { Projection } from '../types';
import { Dimension, Margins } from '../../../types';

type Options = {
  dimension: Dimension;
  margins: Margins;
  projection: {
    type: Projection;
    scale: number;
    translation: [number, number];
    rotation: [number, number, number];
  };
  colorScale: {
    colors: string[];
    mode: ColorMode;
    steps: number;
  };
  topology: ExtendedFeatureCollection;
  geoKey: string;
  valueKey: string;
  data: Record<string, any>[];
};

export type GeoPropety = {
  index: number;
  data: Record<string, any>;
};

const projections: Record<Projection, () => GeoProjection> = {
  mercator: geoMercator,
  orthographic: geoOrthographic,
  azimuthalEqualArea: geoAzimuthalEqualArea,
};

export const generateChoropleth = ({
  data,
  projection,
  geoKey,
  valueKey,
  colorScale,
  dimension,
  topology,
}: Options) => {
  const geoData = new Map<string, GeoPropety>();
  const { width, height } = dimension;
  const { rotation, translation, scale, type } = projection;
  const { mode, colors, steps } = colorScale;

  const [translateX, translateY] = translation;
  const { minimum, maximum } = calculateRange(data, 'auto', 'auto', [valueKey]);

  const getColor = calculateColorScale(minimum, maximum, mode, steps, colors);

  data.forEach((item, idx) => {
    const key = item[geoKey];
    geoData.set(key, {
      index: idx,
      data: item,
    });
  });

  const geoProjection = projections[type]()
    .fitSize([width, height], topology)
    .rotate(rotation)
    .translate([width / 2 + translateX, height / 2 + translateY])
    .scale(scale);

  const graticule = geoGraticule();

  const drawPath = geoPath().projection(geoProjection);

  return {
    graticule,
    drawPath,
    getColor,
    geoData,
  };
};

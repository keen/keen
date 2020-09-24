/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useMemo, useEffect } from 'react';
import {
  geoMercator,
  geoAlbersUsa,
  geoOrthographic,
  geoGraticule,
  geoAzimuthalEqualArea,
  geoEqualEarth,
  geoNaturalEarth1,
  geoPath,
  GeoProjection,
  ExtendedFeatureCollection,
} from 'd3-geo';
import { calculateRange } from '@keen.io/charts-utils';
import { ColorMode } from '@keen.io/ui-core';

import { calculateColorScale } from '../../../utils/colors.utils';

import { NOT_SUPPORT_ROTATION } from '../constants';

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
  geoAlbersUsa: geoAlbersUsa,
  orthographic: geoOrthographic,
  equalEarth: geoEqualEarth,
  naturalEarth: geoNaturalEarth1,
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
  const { translation, rotation, scale, type } = projection;
  const { mode, colors, steps } = colorScale;

  const geoProjectionRef = useRef(projections[type]());

  useEffect(() => {
    geoProjectionRef.current = projections[type]();
  }, [type]);

  const [translateX, translateY] = translation;
  const { minimum, maximum } = useMemo(
    () => calculateRange(data, 0, 'auto', [valueKey]),
    [valueKey, data]
  );

  const getColor = calculateColorScale(minimum, maximum, mode, steps, colors);

  data.forEach((item, idx) => {
    const key = item[geoKey];
    geoData.set(key, {
      index: idx,
      data: item,
    });
  });

  geoProjectionRef.current
    .fitSize([width, height], topology)
    .translate([width / 2 + translateX, height / 2 + translateY])
    .scale(scale);

  if (!NOT_SUPPORT_ROTATION.includes(type)) {
    geoProjectionRef.current.rotate(rotation);
  }

  const graticule = useMemo(() => geoGraticule(), []);
  const drawPath = geoPath().projection(geoProjectionRef.current);

  return {
    graticule,
    drawPath,
    getColor,
    geoProjection: geoProjectionRef.current,
    geoData,
  };
};

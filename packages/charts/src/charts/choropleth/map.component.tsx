import React, { FC, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ExtendedFeatureCollection } from 'd3-geo';

import { ColorMode } from '@keen.io/ui-core';

import { generateChoropleth } from './utils';

import { ChartContext, ChartContextType } from '../../contexts';
import { TooltipMeta } from './types';

const defaultGeometry: Record<string, any> = {
  data: {},
  index: null,
};

type Props = {
  data: Record<string, any>[];
  topology: ExtendedFeatureCollection;
  geoKey: string;
  labelKey: string;
  valueKey: string;
  colorMode?: ColorMode;
  steps: number;
  onMouseEnter: (e: React.MouseEvent, meta: TooltipMeta) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
};

export const Map: FC<Props> = ({
  data,
  geoKey,
  valueKey,
  topology,
  colorMode,
  steps,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [, setActive] = useState(null);
  const { margins, svgDimensions, theme } = useContext(
    ChartContext
  ) as ChartContextType;
  const { features } = topology;

  const { drawPath, geoData, getColor } = generateChoropleth({
    topology,
    margins,
    geoKey,
    valueKey,
    data,
    dimension: svgDimensions,
    colorMode,
    colors: theme.colors,
    steps,
  });

  return (
    <>
      {features.map((geometry, idx) => {
        const {
          properties: { name },
        } = geometry;

        const geometryProperties = geoData.get(name) || defaultGeometry;
        const value = geometryProperties.data[valueKey] || 0;

        const color = getColor(value);

        const meta = {
          color,
          value,
          label: name,
        };

        return (
          <motion.path
            key={idx}
            d={drawPath(geometry)}
            fill={color}
            onMouseEnter={e => {
              setActive(name);
              onMouseEnter(e, meta);
            }}
            onMouseMove={e => onMouseEnter(e, meta)}
            onMouseLeave={e => {
              setActive(null);
              onMouseLeave(e);
            }}
          />
        );
      })}
    </>
  );
};

export default Map;

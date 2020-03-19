import React, { FC, useContext } from 'react';
import {
  ExtendedFeatureCollection,
  GeoGraticuleGenerator,
  GeoPath,
  GeoPermissibleObjects,
} from 'd3-geo';

import Graticule from './graticule.component';
import { GeoPropety } from './utils/chart.utils';

import { ChartContext, ChartContextType } from '../../contexts';

import { TooltipMeta } from './types';

const defaultGeometry: Record<string, any> = {
  data: {},
  index: null,
};

type Props = {
  topology: ExtendedFeatureCollection;
  labelKey: string;
  valueKey: string;
  onMouseEnter: (e: React.MouseEvent, meta: TooltipMeta) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  drawPath: GeoPath<any, GeoPermissibleObjects>;
  graticule: GeoGraticuleGenerator;
  geoData: Map<string, GeoPropety>;
  geoKey: string;
  getColor: (value: number) => string;
};

export const Map: FC<Props> = ({
  valueKey,
  topology,
  drawPath,
  graticule,
  geoData,
  getColor,
  onMouseEnter,
  onMouseLeave,
}) => {
  const {
    theme: {
      choropleth: { map, graticule: graticuleSettings },
    },
  } = useContext(ChartContext) as ChartContextType;
  const { features } = topology;

  return (
    <>
      {graticuleSettings.enabled && (
        <Graticule
          stroke={graticuleSettings.color}
          draw={drawPath}
          graticule={graticule}
        />
      )}
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
          <path
            key={`${name}-${idx}`}
            d={drawPath(geometry)}
            fill={color}
            strokeWidth="0.5"
            stroke={map.stroke}
            onMouseEnter={e => onMouseEnter(e, meta)}
            onMouseMove={e => onMouseEnter(e, meta)}
            onMouseLeave={e => onMouseLeave(e)}
          />
        );
      })}
    </>
  );
};

export default Map;

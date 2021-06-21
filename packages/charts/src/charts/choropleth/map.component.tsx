import React, { FC, useEffect, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ExtendedFeatureCollection,
  GeoGraticuleGenerator,
  GeoPath,
  GeoPermissibleObjects,
} from 'd3-geo';
import { RangeType } from '@keen.io/ui-core';

import { Graticule, MapPath, Sphere } from './components';
import {
  detectGeographicMatch,
  GeoProperty,
  GeoAreaMatchStatus,
} from './utils';

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
  geoData: Map<string, GeoProperty>;
  geoKey: string;
  getColor: (value: number) => string;
  valuesRange?: RangeType;
  /** Partial elements key selector */
  elementsKey?: string;
  /** Geographic match status handler */
  onUpdateGeoMatchStatus?: (status: GeoAreaMatchStatus) => void;
};

const mapPathMotion = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  animate: { opacity: 1 },
};

export const Map: FC<Props> = ({
  valueKey,
  elementsKey,
  topology,
  drawPath,
  graticule,
  geoData,
  getColor,
  onMouseEnter,
  onMouseLeave,
  onUpdateGeoMatchStatus,
  valuesRange,
}) => {
  const {
    theme: {
      choropleth: { map, graticule: graticuleSettings, sphere: sphereSettings },
    },
  } = useContext(ChartContext) as ChartContextType;
  const { features } = topology;

  useEffect(() => {
    if (onUpdateGeoMatchStatus) {
      const matchStatus = detectGeographicMatch(topology, [...geoData.keys()]);
      onUpdateGeoMatchStatus(matchStatus);
    }
  }, []);

  return (
    <>
      {sphereSettings.enabled && (
        <Sphere background={sphereSettings.backgroundColor} draw={drawPath} />
      )}
      {graticuleSettings.enabled && (
        <Graticule
          stroke={graticuleSettings.color}
          draw={drawPath}
          graticule={graticule}
        />
      )}
      <AnimatePresence>
        {features.map((geometry, idx) => {
          const {
            properties: { name, iso_3166_2: iso3166, postAbbreviation },
          } = geometry;

          const geometryProperties =
            geoData.get(name) ||
            geoData.get(iso3166) ||
            geoData.get(postAbbreviation) ||
            defaultGeometry;

          const value = geometryProperties.data[valueKey] || 0;
          const inRange = valuesRange
            ? value >= valuesRange.min && value <= valuesRange.max
            : true;

          if (!inRange) return null;
          const color = getColor(value);

          const meta = {
            color,
            value,
            elements: elementsKey && geometryProperties.data[elementsKey],
            label: name,
          };

          return (
            <motion.g
              key={`${name}-${idx}`}
              onMouseEnter={(e) => onMouseEnter(e, meta)}
              onMouseMove={(e) => onMouseEnter(e, meta)}
              onMouseLeave={(e) => onMouseLeave(e)}
              {...mapPathMotion}
            >
              <MapPath
                path={drawPath(geometry)}
                fill={color}
                strokeWidth="0.5"
                stroke={map.stroke}
              />
            </motion.g>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default Map;

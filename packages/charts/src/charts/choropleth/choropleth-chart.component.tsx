import React, { FC, useEffect, useState, useRef } from 'react';
import { ExtendedFeatureCollection } from 'd3-geo';
import { motion, AnimatePresence } from 'framer-motion';

import { Loader, Tooltip, ColorMode, BulletList } from '@keen.io/ui-core';

import Map from './map.component';

import { ChartBase } from '../../components';
import { useTooltip } from '../../hooks';

import { fetchMapTopology, MapType } from './utils';

import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import { CommonChartSettings } from '../../types';

const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export type Props = {
  /** Chart data */
  data: Record<string, any>[];
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Key used to match map topology with data */
  geoKey?: string;
  /** Key used to pick value property from data */
  valueKey?: string;
  /** Type of map */
  map?: MapType;
  /** Color mode */
  colorMode?: ColorMode;
  /** Amount of step for color calculation */
  steps?: number;
} & CommonChartSettings;

export const ChoroplethChart: FC<Props> = ({
  svgDimensions,
  theme = defaultTheme,
  margins = defaultMargins,
  labelSelector,
  colorMode,
  steps,
  map = 'world',
  geoKey = 'geo.country',
  valueKey = 'value',
  data,
}) => {
  const [topology, setTopology] = useState<ExtendedFeatureCollection>(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMapTopology(map).then(mapTopology => {
      setTopology(mapTopology);
      setLoading(false);
    });
  }, [map]);

  const svgElement = useRef(null);

  const {
    tooltipVisible,
    tooltipPosition,
    tooltipMeta,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement, 100);

  const { tooltip: tooltipSettings } = theme;

  return (
    <>
      {loading && <Loader width={40} height={40} />}
      <AnimatePresence>
        {tooltipVisible && (
          <motion.div
            {...tooltipMotion}
            initial={{ opacity: 0, x: tooltipPosition.x, y: tooltipPosition.y }}
            animate={{
              x: tooltipPosition.x,
              y: tooltipPosition.y,
              opacity: 1,
            }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
            }}
          >
            <Tooltip mode={tooltipSettings.mode} hasArrow={false}>
              {tooltipMeta && (
                <BulletList
                  list={[
                    {
                      color: tooltipMeta.color,
                      value: `${tooltipMeta.label} - ${tooltipMeta.value}`,
                    },
                  ]}
                  typography={tooltipSettings.labels.typography}
                />
              )}
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
      {topology && (
        <ChartBase
          ref={svgElement}
          theme={theme}
          svgDimensions={svgDimensions}
          margins={margins}
        >
          <Map
            data={data}
            topology={topology}
            colorMode={colorMode}
            steps={steps}
            labelKey={labelSelector}
            geoKey={geoKey}
            valueKey={valueKey}
            onMouseEnter={(e, meta) => {
              if (tooltipSettings.enabled) {
                updateTooltipPosition(e, null, meta);
              }
            }}
            onMouseLeave={() => {
              hideTooltip();
            }}
          />
        </ChartBase>
      )}
    </>
  );
};

export default ChoroplethChart;

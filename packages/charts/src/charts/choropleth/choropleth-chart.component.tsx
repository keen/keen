import React, { FC, useState, useEffect, useRef } from 'react';
import { ExtendedFeatureCollection } from 'd3-geo';
import { motion, AnimatePresence } from 'framer-motion';

import { Tooltip, ColorMode, BulletList, RangeType } from '@keen.io/ui-core';
import { useTooltip } from '@keen.io/react-hooks';

import Map from './map.component';

import { ChartBase } from '../../components';
import { generateChoropleth } from './utils';

import { useZoom, useDragHandlers } from './hooks';

import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import { THREE_DIMENSION_PROJECTIONS } from './constants';

import { Projection, ProjectionState } from './types';
import { CommonChartSettings, TooltipFormatter } from '../../types';

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
  geoKey: string;
  /** Key used to pick value property from data */
  valueKey?: string;
  /** Collection of GeoJSON features */
  topology?: ExtendedFeatureCollection;
  /** Type of geo projection */
  projection?: Projection;
  /** Projection scale */
  projectionScale?: number;
  /** Translate x and y */
  projectionTranslation?: [number, number];
  /** Spherical rotation to the specified angles */
  projectionRotation?: [number, number, number];
  /** Color scale mode */
  colorMode?: ColorMode;
  /** Amount of step used in color scale */
  colorSteps?: number;
  /** Range for filtering map values */
  valuesRange?: RangeType;
  /** Tooltip formatter */
  formatTooltip?: TooltipFormatter;
} & CommonChartSettings;

export const ChoroplethChart: FC<Props> = ({
  svgDimensions,
  theme = defaultTheme,
  margins = defaultMargins,
  labelSelector,
  geoKey,
  colorMode,
  colorSteps,
  topology,
  valuesRange,
  projection = 'mercator',
  projectionScale = 100,
  projectionTranslation = [0, 0],
  projectionRotation = [0, 0, 0],
  valueKey = 'value',
  data,
  formatTooltip,
}) => {
  const svgElement = useRef<SVGSVGElement>(null);
  const [projectionState, setProjectionState] = useState<ProjectionState>({
    rotation: projectionRotation,
    scale: projectionScale,
    translation: projectionTranslation,
  });

  const {
    tooltipVisible,
    tooltipPosition,
    tooltipMeta,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement);

  const { tooltip: tooltipSettings } = theme;

  const {
    drawPath,
    graticule,
    geoData,
    geoProjection,
    getColor,
  } = generateChoropleth({
    topology,
    projection: {
      type: projection,
      rotation: projectionState.rotation,
      translation: projectionState.translation,
      scale: projectionState.scale,
    },
    margins,
    geoKey,
    valueKey,
    data,
    dimension: svgDimensions,
    colorScale: {
      colors: theme.colors,
      mode: colorMode,
      steps: colorSteps,
    },
  });

  const { dragged } = useDragHandlers(
    svgElement,
    geoProjection,
    setProjectionState,
    THREE_DIMENSION_PROJECTIONS.includes(projection) ? 'rotate' : 'translate'
  );

  useZoom(svgElement, setProjectionState, projectionScale);

  useEffect(() => {
    if (dragged && tooltipSettings.enabled) hideTooltip();
  }, [dragged]);

  return (
    <>
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
                      value: `${tooltipMeta.label} - ${
                        formatTooltip
                          ? formatTooltip(tooltipMeta.value)
                          : tooltipMeta.value
                      }`,
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
            topology={topology}
            drawPath={drawPath}
            graticule={graticule}
            getColor={getColor}
            labelKey={labelSelector}
            geoData={geoData}
            geoKey={geoKey}
            valueKey={valueKey}
            valuesRange={valuesRange}
            onMouseEnter={(e, meta) => {
              if (tooltipSettings.enabled && !dragged) {
                updateTooltipPosition(e, null, meta);
              }
            }}
            onMouseLeave={() => {
              if (tooltipSettings.enabled) hideTooltip();
            }}
          />
        </ChartBase>
      )}
    </>
  );
};

export default ChoroplethChart;

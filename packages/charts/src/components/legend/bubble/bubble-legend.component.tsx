import React, { FC, useRef, useEffect, useState } from 'react';
import { RefText } from '@keen.io/ui-core';
import { motion, AnimatePresence } from 'framer-motion';
import { useTooltip } from '@keen.io/react-hooks';

import { Wrapper, LegendWrapper, TitleWrapper } from './bubble-legend.styles';

import { Typography, Tooltip } from '@keen.io/ui-core';

import { Circles } from './bubble-circles.component';
import { Labels } from './bubble-labels.component';
import { TooltipContent } from './tooltip-conent.component';

import { theme as defaultTheme } from '../../../theme';
import { CommonChartSettings } from '../../../types';

import { isTruncated } from './bubble-legend.utils';

import { TOOLTIP_MOTION } from '../../../constants';

type Props = {
  /** typography styles */
  typography: Typography;
  /** Radius range of chart bubbles */
  minRadius: number;
  maxRadius: number;
  /** Chart domain [min, max] */
  domain: [number, number];
  /** Legend title settings */
  title: {
    value?: string;
    typography?: Typography;
  };
} & CommonChartSettings;

export const BubbleLegend: FC<Props> = ({
  theme = defaultTheme,
  typography,
  domain,
  title,
  minRadius = 5,
  maxRadius = 40,
}) => {
  const { tooltip: tooltipSettings } = theme;
  const { fontSize } = typography;

  const titleRef = useRef(null);
  const wrapperRef = useRef(null);

  const [truncate, setTruncate] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      setTruncate(isTruncated(titleRef.current));
    }
  }, [title]);

  const {
    tooltipVisible,
    tooltipPosition,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(wrapperRef);

  return (
    <Wrapper data-testid="bubble-legend">
      <AnimatePresence>
        {tooltipVisible && truncate && (
          <motion.div
            {...TOOLTIP_MOTION}
            initial={{ opacity: 0, x: tooltipPosition.x, y: tooltipPosition.y }}
            animate={{
              x: tooltipPosition.x,
              y: tooltipPosition.y,
              opacity: 1,
            }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              top: title.typography.fontSize,
              left: 0,
            }}
          >
            <Tooltip mode={tooltipSettings.mode} hasArrow={false}>
              <TooltipContent typography={tooltipSettings.labels.typography}>
                {title?.value}
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
      <LegendWrapper>
        <TitleWrapper
          ref={wrapperRef}
          onMouseEnter={(e) => {
            if (truncate) {
              updateTooltipPosition(e);
            }
          }}
          onMouseMove={(e) => {
            if (truncate) {
              updateTooltipPosition(e);
            }
          }}
          onMouseLeave={() => {
            hideTooltip();
          }}
        >
          {title?.value && (
            <RefText truncate={true} {...title?.typography} ref={titleRef}>
              {title.value}
            </RefText>
          )}
        </TitleWrapper>
        <svg viewBox={`0 0 80 ${80 + fontSize}`}>
          <Circles domain={domain} offsetTop={fontSize} />
          <Labels
            domain={domain}
            typography={typography}
            minRadius={minRadius}
            maxRadius={maxRadius}
          />
        </svg>
      </LegendWrapper>
    </Wrapper>
  );
};

export default BubbleLegend;

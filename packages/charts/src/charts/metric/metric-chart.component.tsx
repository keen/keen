import React, { FC, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@keen.io/icons';
import { Text } from '@keen.io/ui-core';
import {
  formatValue as valueFormatter,
  Formatter,
} from '@keen.io/charts-utils';

import MetricIcon from './metric-icon.component';
import {
  Excerpt,
  Wrapper,
  TextWrapper,
  ValueContainer,
  IconWrapper,
  Layout,
} from './metric-chart.styles';

import { generateMetric } from './utils';
import { createMargins } from '../../utils/element.utils';

import { theme as defaultTheme } from '../../theme';

import { MetricType } from './types';
import { CommonChartSettings } from '../../types';
import { MetricTooltip } from './components';

export const textMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, delay: 0.2 },
  exit: {},
};

export const decreaseMotion = {
  initial: { opacity: 0.5, y: -5 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
  exit: {},
};

export const increaseMotion = {
  initial: { opacity: 0.5, y: 5 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
  exit: {},
};

export type Props = {
  /** Chart data */
  data: Record<string, any>[];
  /** Caption for describing metric */
  caption?: string;
  /** Name of data object property used to create label */
  labelSelector?: string;
  /** Keys picked from data object used to create metric */
  keys?: string[];
  /** Prefix for value */
  valuePrefix?: React.ReactNode;
  /** Suffix for value */
  valueSuffix?: React.ReactNode;
  /** Value format function */
  formatValue?: Formatter;
  /** Metric type */
  type?: MetricType;
  /** Use percentage difference */
  usePercentDifference?: boolean;
  secondaryValueDescription?: string;
} & CommonChartSettings;

export const MetricChart: FC<Props> = ({
  data,
  caption,
  valuePrefix,
  valueSuffix,
  formatValue,
  labelSelector = 'name',
  theme = defaultTheme,
  keys = ['value'],
  type = 'simple',
  usePercentDifference = false,
  secondaryValueDescription,
  portalContainer,
}) => {
  const { value, previousValue, difference } = generateMetric({
    labelSelector,
    keys,
    data,
    type,
    usePercentDifference,
  });

  const {
    metric: {
      excerpt,
      caption: captionSettings,
      value: valueSettings,
      icon,
      prefix,
      suffix,
    },
  } = theme;

  const statusIcon = {
    ...(difference?.status === 'increase'
      ? excerpt.icons.increase
      : excerpt.icons.decrease),
  };

  const requestFrameRef = useRef(null);

  const { tooltip: tooltipSettings } = theme;
  const excerptValue = type === 'difference' ? difference.value : previousValue;

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [chartPosition, setChartPosition] = useState({
    left: 0,
    top: 0,
    offsetLeft: 0,
    offsetTop: 0,
  });

  const layoutRef = useCallback((node) => {
    if (node !== null) {
      const offsetLeft = node.offsetLeft;
      const offsetTop = node.offsetTop;
      const { left, top } = node.getBoundingClientRect();
      const absoluteTopPosition =
        window.scrollY !== 0 ? window.scrollY + top - offsetTop : top;
      setChartPosition({
        left,
        top: absoluteTopPosition,
        offsetLeft,
        offsetTop,
      });
    }
  }, []);

  return (
    <Layout ref={layoutRef}>
      <ValueContainer>
        <AnimatePresence>
          <motion.div {...textMotion}>
            <TextWrapper>
              {valuePrefix && <Text {...prefix.typography}>{valuePrefix}</Text>}
              <Text {...valueSettings.typography}>
                {valueFormatter(value, formatValue)}
              </Text>
              {valueSuffix && <Text {...suffix.typography}>{valueSuffix}</Text>}
            </TextWrapper>
          </motion.div>
        </AnimatePresence>
        {caption && <Text {...captionSettings.typography}>{caption}</Text>}
        {secondaryValueDescription && tooltipVisible && (
          <MetricTooltip
            tooltipPosition={tooltipPosition}
            tooltipSettings={tooltipSettings}
            portalRef={portalContainer}
          >
            <Text {...tooltipSettings.labels.typography}>
              {secondaryValueDescription}
            </Text>
          </MetricTooltip>
        )}
        {difference && (
          <div>
            <Excerpt
              data-testid="metric-excerpt-value"
              background={excerpt.backgroundColor}
              onMouseEnter={(e) => {
                setTooltipVisible(true);

                const { left, top, offsetTop, offsetLeft } = chartPosition;
                const x = e.clientX - (left - window.scrollX) + offsetLeft;
                const y = e.clientY - (top - window.scrollY) + offsetTop;
                setTooltipPosition({ x, y });
              }}
              onMouseMove={(e) => {
                e.persist();
                const { left, top, offsetTop, offsetLeft } = chartPosition;
                const x = e.clientX - (left - window.scrollX) + offsetLeft;
                const y = e.clientY - (top - window.scrollY) + offsetTop;

                if (requestFrameRef.current)
                  cancelAnimationFrame(requestFrameRef.current);
                requestFrameRef.current = requestAnimationFrame(() => {
                  setTooltipPosition({ x, y });
                });
              }}
              onMouseLeave={() => {
                setTooltipVisible(false);
              }}
            >
              <Wrapper>
                {type !== 'comparison' && difference.status !== 'static' && (
                  <AnimatePresence>
                    <motion.div
                      {...(difference.status === 'increase'
                        ? increaseMotion
                        : decreaseMotion)}
                    >
                      <IconWrapper>
                        <Icon type={statusIcon.type} fill={statusIcon.color} />
                      </IconWrapper>
                    </motion.div>
                  </AnimatePresence>
                )}
                <Text {...excerpt.typography}>
                  {type === 'difference' && usePercentDifference
                    ? `${excerptValue}%`
                    : valueFormatter(excerptValue, formatValue)}
                </Text>
              </Wrapper>
            </Excerpt>
          </div>
        )}
      </ValueContainer>
      {icon.enabled && (
        <div style={createMargins(icon.margins)}>
          <MetricIcon
            position={icon.position}
            circleStyle={icon.style}
            baseColor={valueSettings.typography.fontColor}
          >
            <Icon
              type={icon.type}
              width={80}
              height={80}
              opacity={icon.style === 'solid' ? 0.15 : 0.2}
              fill={valueSettings.typography.fontColor}
            />
          </MetricIcon>
        </div>
      )}
    </Layout>
  );
};

export default MetricChart;

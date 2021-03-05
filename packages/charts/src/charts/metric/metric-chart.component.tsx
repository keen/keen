import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@keen.io/icons';
import { Text } from '@keen.io/ui-core';
import {
  formatNumber,
  formatValue as valueFormatter,
  TooltipFormatter,
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
  formatValue?: TooltipFormatter;
  /** Metric type */
  type?: MetricType;
  /** Use percentage difference */
  usePercentDifference?: boolean;
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
}) => {
  const { value, difference } = generateMetric({
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

  return (
    <Layout>
      <ValueContainer>
        <AnimatePresence>
          <motion.div {...textMotion}>
            <TextWrapper>
              {valuePrefix && <Text {...prefix.typography}>{valuePrefix}</Text>}
              <Text {...valueSettings.typography}>
                {formatValue ? valueFormatter(value, formatValue) : value}
              </Text>
              {valueSuffix && <Text {...suffix.typography}>{valueSuffix}</Text>}
            </TextWrapper>
          </motion.div>
        </AnimatePresence>
        {caption && <Text {...captionSettings.typography}>{caption}</Text>}
        {difference && (
          <div>
            <Excerpt
              data-testid="metric-excerpt-value"
              background={excerpt.backgroundColor}
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
                    ? `${difference.value}%`
                    : formatNumber(difference.value)}
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

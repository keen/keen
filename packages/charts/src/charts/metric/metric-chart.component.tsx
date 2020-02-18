import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@keen.io/icons';
import { Text } from '@keen.io/ui-core';

import { Excerpt, Wrapper, IconWrapper, Layout } from './metric-chart.styles';

import { generateMetic, formatNumber } from './utils';
import { theme as defaultTheme } from '../../theme';

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
  data: object[];
  /** Name of data object property used to create label */
  labelSelector?: string;
  /** Keys picked from data object used to create metric */
  keys?: string[];
  /** Prefix for metric value */
  labelPrefix?: string;
  /** Suffix for metric value */
  labelSuffix?: string;
  /** Metric type */
  type?: 'percent' | 'difference' | 'compare';
} & CommonChartSettings;

export const MetricChart: FC<Props> = ({
  data,
  labelPrefix,
  labelSuffix,
  labelSelector = 'name',
  theme = defaultTheme,
  keys = ['value'],
  type = 'compare',
}) => {
  const { value, difference } = generateMetic({
    labelSelector,
    keys,
    data,
    type,
  });

  const {
    metric: { excerpt, label },
  } = theme;

  const icon = {
    ...(difference?.status === 'increase'
      ? excerpt.icons.increase
      : excerpt.icons.decrease),
  };

  return (
    <Layout>
      <AnimatePresence>
        <motion.div {...textMotion}>
          <Text data-test="metric-label" {...label.typography}>
            {labelPrefix && labelPrefix}
            {value}
            {labelSuffix && labelSuffix}
          </Text>
        </motion.div>
      </AnimatePresence>
      {difference && (
        <div>
          <Excerpt
            data-test="metric-excerpt-container"
            background={excerpt.backgroundColor}
          >
            <Wrapper>
              {type !== 'compare' && difference.status !== 'static' && (
                <AnimatePresence>
                  <motion.div
                    {...(difference.status === 'increase'
                      ? increaseMotion
                      : decreaseMotion)}
                  >
                    <IconWrapper>
                      <Icon type={icon.type} fill={icon.color} />
                    </IconWrapper>
                  </motion.div>
                </AnimatePresence>
              )}
              <Text data-test="metric-excerpt-label" {...excerpt.typography}>
                {type === 'percent'
                  ? `${difference.value}%`
                  : formatNumber(difference.value)}
              </Text>
            </Wrapper>
          </Excerpt>
        </div>
      )}
    </Layout>
  );
};

export default MetricChart;

import React, { FC } from 'react';
import { TooltipFormatter } from '@keen.io/charts-utils';

import useDistributedChartTooltipSettings from '../../hooks/use-distributed-chart-tooltip-settings';
import TooltipContent from '../tooltip-content';
import { DataSelector } from '../../types';

type Props = {
  /** Data series */
  data: Record<string, any>[];
  /** Collection of all keys used from data series */
  keys: string[];
  /** Collection of disabled keys */
  disabledKeys: string[];
  /** Selectors used to pick data from series */
  selectors: { selector: DataSelector; color: string }[];
  /** Indicates if tooltip should display data in percentage form */
  isPercentage: boolean;
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Max width for tooltip */
  maxWidth?: number;
  /** Tooltip formatter */
  formatValue?: TooltipFormatter;
};

const DistributedChartTooltip: FC<Props> = ({
  data,
  keys,
  disabledKeys,
  selectors,
  isPercentage,
  labelSelector,
  maxWidth,
  formatValue,
}) => {
  const {
    tooltipLabel,
    percentValue,
    totalValue,
    items,
  } = useDistributedChartTooltipSettings(
    data,
    keys,
    disabledKeys,
    selectors,
    isPercentage,
    labelSelector,
    maxWidth,
    formatValue
  );

  return (
    <TooltipContent
      items={items}
      label={tooltipLabel && `${tooltipLabel}`}
      totalValue={totalValue}
      percentValue={percentValue}
      maxWidth={maxWidth}
    />
  );
};

export default DistributedChartTooltip;

import React, { FC } from 'react';

import TooltipContent from '../tooltip-content';
import { useDistributedTooltip } from './hooks';

import { DataSelector } from '../../types';
import { TooltipSettings } from '../../types';

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
  /** Indicates if tooltip should display stacked data */
  isStacked: boolean;
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Max width for tooltip */
  maxWidth?: number;
  /** Tooltip settings */
  tooltipSettings: TooltipSettings;
  /** Scale settings */
  isTimePrecise: boolean;
};

const DistributedChartTooltip: FC<Props> = ({
  data,
  keys,
  disabledKeys,
  selectors,
  isPercentage,
  isStacked,
  labelSelector,
  maxWidth,
  tooltipSettings,
  isTimePrecise,
}) => {
  const { label, percentValue, totalValue, items } = useDistributedTooltip({
    data,
    keys,
    disabledKeys,
    selectors,
    isPercentage,
    isStacked,
    labelSelector,
    tooltipSettings,
    isTimePrecise,
  });

  return (
    <TooltipContent
      items={items}
      label={label}
      totalValue={totalValue}
      percentValue={percentValue}
      maxWidth={maxWidth}
    />
  );
};

export default DistributedChartTooltip;

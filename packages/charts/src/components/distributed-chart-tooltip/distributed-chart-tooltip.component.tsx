import React, { FC } from 'react';

import TooltipContent from '../tooltip-content';
import { DataSelector } from '../../types';
import { getDistributedChartTooltipSettings } from './utils';
import { ScaleSettings, TooltipFormatter } from '@keen.io/charts-utils';

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
  formatValue: TooltipFormatter;
  /** Scale settings */
  scaleSettings: ScaleSettings;
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
  scaleSettings,
}) => {
  const {
    getTooltipLabel,
    percentValue,
    totalValue,
    items,
  } = getDistributedChartTooltipSettings({
    data,
    keys,
    disabledKeys,
    selectors,
    isPercentage,
    labelSelector,
    formatValue,
    scaleSettings,
  });

  return (
    <TooltipContent
      items={items}
      label={getTooltipLabel()}
      totalValue={totalValue}
      percentValue={percentValue}
      maxWidth={maxWidth}
    />
  );
};

export default DistributedChartTooltip;

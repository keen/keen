import React, { FC, useContext } from 'react';
import {
  getFromPath,
  getKeysDifference,
  transformToPercent,
  TooltipFormatter,
  formatValue as valueFormatter,
} from '@keen.io/charts-utils';

import { TooltipContent } from '../../components';

import { getLabel } from './utils/tooltip.utils';

import { ChartContext, ChartContextType } from '../../contexts';

import { DataSelector, GroupMode, StackMode } from '../../types';

type Props = {
  /** Data series */
  data: Record<string, any>[];
  /** Collection of all keys used from data series */
  keys: string[];
  /** Collection of disabled keys */
  disabledKeys: string[];
  /** Selectors used to pick data from series */
  selectors: { selector: DataSelector; color: string }[];
  /** Group mode configuration */
  groupMode: GroupMode;
  /** Stack mode configuration */
  stackMode: StackMode;
  /** List indicator */
  isList: boolean;
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Max width for tooltip */
  maxWidth?: number;
  /** Tooltip formatter */
  formatValue?: TooltipFormatter;
};

const BarTooltip: FC<Props> = ({
  data,
  keys,
  disabledKeys,
  selectors,
  stackMode,
  groupMode,
  isList,
  labelSelector,
  maxWidth,
  formatValue,
}) => {
  const { xScaleSettings } = useContext(ChartContext) as ChartContextType;
  const { precision, formatLabel } = xScaleSettings;

  const isPercentage = stackMode === 'percent' && groupMode === 'stacked';
  const percentageData = isPercentage
    ? transformToPercent(data, getKeysDifference(keys, disabledKeys))
    : [];

  const [firstSelector] = selectors;
  const [index] = firstSelector.selector;

  const tooltipLabel =
    precision && typeof index === 'number'
      ? valueFormatter(data[index][labelSelector], formatLabel)
      : null;

  const totalValue = isList
    ? keys.reduce((acc: number, keyName: string) => {
        if (typeof index !== 'number') return acc;
        return acc + data[index][keyName];
      }, 0)
    : null;

  const percentValue = isPercentage
    ? selectors.reduce((acc, { selector }) => {
        return (
          acc + parseFloat(getFromPath(percentageData, selector).toFixed(2))
        );
      }, 0)
    : null;

  const items = selectors.map(({ color, selector }) => {
    return {
      color,
      data: {
        label: `${selector[1]}`,
        ...getLabel({
          data,
          selector,
          percentageData,
          isPercentage,
          formatValue,
        }),
      },
    };
  });

  return (
    <div data-testid="bar-tooltip">
      <TooltipContent
        items={items}
        label={tooltipLabel && `${tooltipLabel}`}
        totalValue={totalValue}
        percentValue={percentValue}
        maxWidth={maxWidth}
      />
    </div>
  );
};

export default BarTooltip;

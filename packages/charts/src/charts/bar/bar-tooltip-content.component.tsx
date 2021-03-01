import React, { FC, useContext } from 'react';
import { Text, BulletList } from '@keen.io/ui-core';
import {
  getFromPath,
  getKeysDifference,
  transformToPercent,
} from '@keen.io/charts-utils';

import { getLabel } from './utils/tooltip.utils';

import { ChartContext, ChartContextType } from '../../contexts';

import {
  DataSelector,
  GroupMode,
  StackMode,
  TooltipFormatter,
} from '../../types';

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
  formatValue,
}) => {
  const {
    theme: { tooltip },
  } = useContext(ChartContext) as ChartContextType;

  const isPercentage = stackMode === 'percent' && groupMode === 'stacked';
  const percentageData = isPercentage
    ? transformToPercent(data, getKeysDifference(keys, disabledKeys))
    : [];

  return (
    <div data-testid="bar-tooltip">
      {isList ? (
        <BulletList
          items={selectors.map(({ color, selector }) => ({
            data: getLabel({
              data,
              selector,
              percentageData,
              isPercentage,
              formatValue,
            }),
            color,
          }))}
          renderItem={(_idx, item) => (
            <Text {...tooltip.labels.typography}>{item.data}</Text>
          )}
        />
      ) : (
        <>
          {selectors.map(({ selector, color }) => (
            <Text {...tooltip.labels.typography} key={color}>
              {formatValue
                ? formatValue(getFromPath(data, selector))
                : getFromPath(data, selector)}
            </Text>
          ))}
        </>
      )}
    </div>
  );
};

export default BarTooltip;

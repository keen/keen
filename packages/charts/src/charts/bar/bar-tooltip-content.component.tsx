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
  formatTooltip?: TooltipFormatter;
};

const BarTooltip: FC<Props> = ({
  data,
  keys,
  disabledKeys,
  selectors,
  stackMode,
  groupMode,
  isList,
  formatTooltip,
}) => {
  const {
    theme: { tooltip },
  } = useContext(ChartContext) as ChartContextType;

  const isPercentage = stackMode === 'percent' && groupMode === 'stacked';
  const percentageData = isPercentage
    ? transformToPercent(data, getKeysDifference(keys, disabledKeys))
    : [];

  return (
    <>
      {isList ? (
        <BulletList
          typography={tooltip.labels.typography}
          list={selectors.map(({ color, selector }) => ({
            value: getLabel({
              data,
              selector,
              percentageData,
              isPercentage,
              formatTooltip,
            }),
            color,
          }))}
        />
      ) : (
        <>
          {selectors.map(({ selector, color }) => (
            <Text {...tooltip.labels.typography} key={color}>
              {formatTooltip
                ? formatTooltip(getFromPath(data, selector))
                : getFromPath(data, selector)}
            </Text>
          ))}
        </>
      )}
    </>
  );
};

export default BarTooltip;

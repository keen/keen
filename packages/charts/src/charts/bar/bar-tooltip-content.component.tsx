import React, { FC, useContext } from 'react';
import { Text, BulletList } from '@keen.io/ui-core';
import {
  getFromPath,
  getKeysDifference,
  transformToPercent,
} from '@keen.io/charts-utils';

import { getLabel } from './utils/tooltip.utils';
import { formatTooltipValue } from '../../utils/tooltip.utils';

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
};

const BarTooltip: FC<Props> = ({
  data,
  keys,
  disabledKeys,
  selectors,
  stackMode,
  groupMode,
  isList,
}) => {
  const {
    theme: { tooltip },
    yScaleSettings: scaleSettings,
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
            value: getLabel({ data, selector, percentageData, isPercentage }),
            color,
          }))}
        />
      ) : (
        <>
          {selectors.map(({ selector, color }) => (
            <Text {...tooltip.labels.typography} key={color}>
              {formatTooltipValue(
                getFromPath(data, selector),
                scaleSettings?.formatLabel
              )}
            </Text>
          ))}
        </>
      )}
    </>
  );
};

export default BarTooltip;

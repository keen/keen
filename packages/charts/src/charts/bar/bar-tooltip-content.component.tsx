import React, { FC, useContext } from 'react';
import { Text, BulletList } from '@keen.io/ui-core';

import { getLabel } from './utils/tooltip.utils';
import { getFromPath } from '../../utils/selectors.utils';
import { getKeysDifference } from '../../utils/data.utils';
import { normalizeToPercent } from '../../utils';

import { ChartContext, ChartContextType } from '../../contexts';

import { DataSelector, GroupMode, StackMode } from '../../types';

type Props = {
  data: object[];
  keys: string[];
  disabledKeys: string[];
  selectors: { selector: DataSelector; color: string }[];
  groupMode: GroupMode;
  stackMode: StackMode;
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
  } = useContext(ChartContext) as ChartContextType;

  const isPercentage = stackMode === 'percent' && groupMode === 'stacked';
  const percentageData = isPercentage
    ? normalizeToPercent(data, getKeysDifference(keys, disabledKeys))
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
              {getFromPath(data, selector)}
            </Text>
          ))}
        </>
      )}
    </>
  );
};

export default BarTooltip;

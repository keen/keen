import React, { FC } from 'react';
import { BulletList } from '@keen.io/ui-core';

import { getLabel } from './utils/tooltip.utils';
import { getKeysDifference, normalizeToPercent } from '../../utils';
import { getFromPath } from '../../utils/selectors.utils';

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
  const isPercentage = stackMode === 'percent' && groupMode === 'stacked';
  const percentageData = isPercentage
    ? normalizeToPercent(data, getKeysDifference(keys, disabledKeys))
    : [];

  return (
    <>
      {isList ? (
        <BulletList
          list={selectors.map(({ color, selector }) => ({
            value: getLabel({ data, selector, percentageData, isPercentage }),
            color,
          }))}
        />
      ) : (
        <>
          {selectors.map(({ selector, color }) => (
            <div key={color}>{getFromPath(data, selector)}</div>
          ))}
        </>
      )}
    </>
  );
};

export default BarTooltip;

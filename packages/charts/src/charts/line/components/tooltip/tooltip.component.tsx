import React, { FC, useContext } from 'react';
import { BulletList, Text } from '@keen.io/ui-core';
import {
  getFromPath,
  TooltipFormatter,
  formatValue as valueFormatter,
} from '@keen.io/charts-utils';

import { DataSelector } from '../../../../types';

import { ChartContext, ChartContextType } from '../../../../contexts';

type Props = {
  data: Record<string, any>[];
  selectors: { selector: DataSelector; color: string }[];
  formatValue?: TooltipFormatter;
};

const Tooltip: FC<Props> = ({ data, selectors, formatValue }) => {
  const {
    theme: { tooltip },
  } = useContext(ChartContext) as ChartContextType;

  return (
    <BulletList
      items={selectors.map(({ color, selector }) => ({
        data: valueFormatter(
          getFromPath(data, selector),
          formatValue
        ).toString(),
        color,
      }))}
      renderItem={(_idx, item) => (
        <Text {...tooltip.labels.typography}>{item.data}</Text>
      )}
    />
  );
};

export default Tooltip;

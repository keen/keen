import React, { FC, useContext } from 'react';
import { BulletList } from '@keen.io/ui-core';
import { getFromPath } from '@keen.io/charts-utils';

import { DataSelector, TooltipFormatter } from '../../types';

import { ChartContext, ChartContextType } from '../../contexts';

type Props = {
  data: Record<string, any>[];
  selectors: { selector: DataSelector; color: string }[];
  formatTooltip?: TooltipFormatter;
};

const Tooltip: FC<Props> = ({ data, selectors, formatTooltip }) => {
  const {
    theme: { tooltip },
  } = useContext(ChartContext) as ChartContextType;

  return (
    <BulletList
      typography={tooltip.labels.typography}
      list={selectors.map(({ color, selector }) => ({
        value: formatTooltip
          ? formatTooltip(getFromPath(data, selector))
          : getFromPath(data, selector),
        color,
      }))}
    />
  );
};

export default Tooltip;

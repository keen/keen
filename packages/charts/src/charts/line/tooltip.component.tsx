import React, { FC, useContext } from 'react';
import { BulletList } from '@keen.io/ui-core';

import { getFromPath, formatTooltipValue } from '../../utils';

import { DataSelector } from '../../types';

import { ChartContext, ChartContextType } from '../../contexts';

type Props = {
  data: object[];
  selectors: { selector: DataSelector; color: string }[];
};

const Tooltip: FC<Props> = ({ data, selectors }) => {
  const {
    theme: { tooltip },
    yScaleSettings: scaleSettings,
  } = useContext(ChartContext) as ChartContextType;

  return (
    <BulletList
      typography={tooltip.labels.typography}
      list={selectors.map(({ color, selector }) => ({
        value: formatTooltipValue(
          getFromPath(data, selector),
          scaleSettings?.formatLabel
        ),
        color,
      }))}
    />
  );
};

export default Tooltip;

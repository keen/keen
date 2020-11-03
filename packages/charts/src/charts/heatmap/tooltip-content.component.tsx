import React, { FC } from 'react';
import { getFromPath } from '@keen.io/charts-utils';
import { Text, Typography } from '@keen.io/ui-core';

import { DataSelector, TooltipFormatter } from '../../types';

type Props = {
  data: Record<string, any>[];
  typography: Typography;
  selectors: { selector: DataSelector; color: string }[];
  formatTooltip?: TooltipFormatter;
};

export const TooltipContent: FC<Props> = ({
  data,
  typography,
  selectors,
  formatTooltip,
}) => {
  const value = getFromPath(data, selectors[0].selector);

  return (
    <Text {...typography}>{formatTooltip ? formatTooltip(value) : value}</Text>
  );
};

export default TooltipContent;

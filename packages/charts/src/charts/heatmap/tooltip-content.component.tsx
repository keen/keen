import React, { FC } from 'react';
import { Text, Typography } from '@keen.io/ui-core';

import { getFromPath } from '../../utils/selectors.utils';

import { DataSelector } from '../../types';

type Props = {
  data: Record<string, any>[];
  typography: Typography;
  selectors: { selector: DataSelector; color: string }[];
};

export const TooltipContent: FC<Props> = ({ data, typography, selectors }) => {
  const value = getFromPath(data, selectors[0].selector);

  return <Text {...typography}>{value}</Text>;
};

export default TooltipContent;

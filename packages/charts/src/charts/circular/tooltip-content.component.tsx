import React, { FC } from 'react';
import { Typography, BulletList } from '@keen.io/ui-core';

import { getTooltipContent } from '../../utils/tooltip.utils';

import { DataSelector } from '../../types';

type Props = {
  data: Record<string, any>[];
  keys: string[];
  typography: Typography;
  labelSelector: string;
  selectors: { selector: DataSelector; color: string }[];
  stacked?: boolean;
};

export const TooltipContent: FC<Props> = ({
  data,
  keys,
  typography,
  labelSelector,
  selectors,
}) => {
  const content = getTooltipContent({ data, keys, labelSelector, selectors });
  return <BulletList list={content} typography={typography} />;
};

export default TooltipContent;

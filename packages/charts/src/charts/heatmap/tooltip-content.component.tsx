import React, { FC } from 'react';

import { getFromPath } from '../../utils/selectors.utils';

import { DataSelector } from '../../types';

type Props = {
  data: Record<string, any>[];
  selectors: { selector: DataSelector; color: string }[];
};

export const TooltipContent: FC<Props> = ({ data, selectors }) => {
  const value = getFromPath(data, selectors[0].selector);

  return <>{value}</>;
};

export default TooltipContent;

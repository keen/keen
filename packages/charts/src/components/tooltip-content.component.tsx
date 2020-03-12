import React, { FC } from 'react';
import { Text, Typography } from '@keen.io/ui-core';

import { StyledItem } from './tooltip-content.styles';
import { getTooltipContent } from '../utils/';

import { DataSelector } from '../types';

type Props = {
  data: Record<string, any>[];
  keys: string[];
  typography: Typography;
  selectors: { selector: DataSelector; color: string }[];
};

export const TooltipContent: FC<Props> = ({
  data,
  keys,
  typography,
  selectors,
}) => {
  const content = getTooltipContent({ data, keys, selectors });

  return (
    <>
      {content.map(({ name, value }) => (
        <StyledItem key={`${name}-${value}`}>
          <Text {...typography}>
            {name} ({value})
          </Text>
        </StyledItem>
      ))}
    </>
  );
};

export default TooltipContent;

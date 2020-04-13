import React, { FC } from 'react';
import { Text, Typography } from '@keen.io/ui-core';

type Props = {
  children: string;
  typography: Typography;
};

export const TooltipContent: FC<Props> = ({ children, typography }) => (
  <Text {...typography}>{children}</Text>
);

export default TooltipContent;

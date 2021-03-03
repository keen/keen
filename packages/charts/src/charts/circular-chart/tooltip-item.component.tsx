import React, { FC } from 'react';
import { Text } from '@keen.io/ui-core';
import { Container } from './tooltip-item.styles';

import { theme as defaultTheme } from '../../theme';
import { Theme } from '../../types';

export type ItemData = {
  label: string;
  value: string;
  change?: string;
};

type Props = {
  /** Item data */
  data: string | ItemData;
  /** Theme using for chart styling */
  theme?: Theme;
};

const TooltipItem: FC<Props> = ({ data, theme = defaultTheme }) => {
  const { tooltip: tooltipSettings } = theme;

  return typeof data === 'string' ? (
    <Text {...tooltipSettings.labels.typography}>{data}</Text>
  ) : (
    <Container>
      <Text {...tooltipSettings.labels.typography}>{data.label}</Text>
      <Text {...tooltipSettings.values.typography}>{data.value}</Text>
      {data.change && (
        <Text {...tooltipSettings.labels.typography}>{data.change}</Text>
      )}
    </Container>
  );
};

export default TooltipItem;

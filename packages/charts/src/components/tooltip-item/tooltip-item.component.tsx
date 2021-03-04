import React, { FC } from 'react';
import { Text } from '@keen.io/ui-core';
import { Container, TextContainer } from './tooltip-item.styles';

import { theme as defaultTheme } from '../../theme';
import { Theme, ItemData } from '../../types';

type Props = {
  /** Item data */
  data: string | ItemData;
  /** Theme using for chart styling */
  theme?: Theme;
};

const TooltipItem: FC<Props> = ({ data, theme = defaultTheme }) => {
  const { tooltip: tooltipSettings } = theme;

  return typeof data === 'string' ? (
    <Text truncate {...tooltipSettings.labels.typography}>
      {data}
    </Text>
  ) : (
    <Container>
      <Text truncate {...tooltipSettings.labels.typography}>
        {data.label}
        <span>:&nbsp;</span>
      </Text>
      <TextContainer>
        <Text {...tooltipSettings.values.typography}>{data.value}</Text>
        {data.change && (
          <Text {...tooltipSettings.labels.typography}>
            &nbsp;{data.change}
          </Text>
        )}
      </TextContainer>
    </Container>
  );
};

export default TooltipItem;

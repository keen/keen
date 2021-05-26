import React, { FC } from 'react';
import {
  TableChart,
  TableChartSettings,
  theme as defaultTheme,
} from '@keen.io/charts';
import { Card } from '@keen.io/ui-core';

import { HeaderContainer } from './table-chart.widget.styles';

import WidgetHeading from '../widget-heading.component';

import { WidgetSettings } from '../../types';

type Props = WidgetSettings & TableChartSettings;

/** Table Chart widget integrated with other components */
export const TableChartWidget: FC<Props> = ({
  theme = defaultTheme,
  title,
  subtitle,
  card,
  ...props
}) => {
  return (
    <Card {...card} padding={0}>
      {(title.content || subtitle.content) && (
        <HeaderContainer>
          <WidgetHeading title={title} subtitle={subtitle} />
        </HeaderContainer>
      )}
      <TableChart {...props} theme={theme} />
    </Card>
  );
};
export default TableChartWidget;

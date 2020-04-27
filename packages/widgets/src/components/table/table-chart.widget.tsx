import React, { FC } from 'react';
import {
  TableChart,
  TableChartSettings,
  theme as defaultTheme,
} from '@keen.io/charts';

import { Card } from '@keen.io/ui-core';
import WidgetHeading from '../widget-heading.component';

import { ContentSocket, TitleSocket } from '../widget-sockets.component';

import { WidgetSettings } from '../../types';

type Props = WidgetSettings & TableChartSettings;

/** Table Chart widget integrated with other components */
export const TableChartWidget: FC<Props> = ({
  theme = defaultTheme,
  title,
  subtitle,
  ...props
}) => {
  return (
    <Card>
      <TitleSocket>
        <WidgetHeading title={title} subtitle={subtitle} />
      </TitleSocket>
      <ContentSocket>
        <TableChart {...props} theme={theme} />
      </ContentSocket>
    </Card>
  );
};
export default TableChartWidget;

import React, { FC, useEffect, useState } from 'react';
import {
  TableChart,
  TableChartSettings,
  TableEvents,
  ChartEvents,
  theme as defaultTheme,
} from '@keen.io/charts';
import { Card } from '@keen.io/ui-core';
import { PubSub } from '@keen.io/pubsub';

import { HeaderContainer } from './table-chart.widget.styles';

import WidgetHeading from '../widget-heading.component';

import { WidgetSettings } from '../../types';

type Props = WidgetSettings &
  TableChartSettings & {
    /** Event communication bus */
    eventBus?: PubSub;
    /** Edit mode indicator */
    inEditMode: boolean;
  };

/** Table Chart widget integrated with other components */
export const TableChartWidget: FC<Props> = ({
  theme = defaultTheme,
  title,
  subtitle,
  card,
  tags,
  eventBus,
  inEditMode = false,
  ...props
}) => {
  const [chartEvents, setChartEvents] =
    useState<ChartEvents<TableEvents>>(null);

  useEffect(() => {
    if (inEditMode && eventBus && chartEvents === null) {
      setChartEvents(new ChartEvents<TableEvents>({ pubsub: eventBus }));
    } else {
      setChartEvents(null);
    }
  }, [inEditMode]);

  return (
    <Card {...card} padding={0}>
      <>
        {(title.content || subtitle.content) && (
          <HeaderContainer padding={card.padding}>
            <WidgetHeading title={title} subtitle={subtitle} tags={tags} />
          </HeaderContainer>
        )}
        <TableChart
          {...props}
          theme={theme}
          chartEvents={chartEvents}
          enableEditMode={inEditMode}
        />
      </>
    </Card>
  );
};
export default TableChartWidget;

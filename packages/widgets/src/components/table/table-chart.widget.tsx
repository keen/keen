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

const Widget = ({ title, subtitle, tags, theme, card, ...props }: Props) => {
  return (
    <>
      {(title.content || subtitle.content) && (
        <HeaderContainer padding={card.padding}>
          <WidgetHeading title={title} subtitle={subtitle} tags={tags} />
        </HeaderContainer>
      )}
      <TableChart {...props} theme={theme} />
    </>
  );
};

/** Table Chart widget integrated with other components */
export const TableChartWidget: FC<Props> = ({
  theme = defaultTheme,
  title,
  subtitle,
  card,
  tags,
  ...props
}) => (
  <Card {...card} padding={0}>
    <Widget
      tags={tags}
      title={title}
      subtitle={subtitle}
      theme={theme}
      card={card}
      {...props}
    />
  </Card>
);
export default TableChartWidget;

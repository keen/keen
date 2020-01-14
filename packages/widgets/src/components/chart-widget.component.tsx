import React from 'react';

import { Card } from '@keen.io/ui-core';

import {
  LayoutMain,
  TitlePosition,
  LegendPosition,
} from './chart-widget.styles';
import {
  getLegendJSX,
  getTitleJSX,
  getContentJSX,
} from './widget-sockets.component';

import { LegendSettings } from '../types';

type Props = {
  children: React.ReactNode;
  legendSettings: Pick<LegendSettings, 'position' | 'layout' | 'alignment'>;
};

const ChartWidget = ({ children, legendSettings }: Props) => {
  const elements = React.Children.toArray(children);
  const legend = elements.find(getLegendJSX);
  const title = elements.find(getTitleJSX);
  const content = elements.find(getContentJSX) as React.ReactElement;

  return (
    <Card>
      <TitlePosition>{title}</TitlePosition>
      <LayoutMain legendPosition={legendSettings.position}>
        {legend && (
          <LegendPosition {...legendSettings}>{legend}</LegendPosition>
        )}
        {content}
      </LayoutMain>
    </Card>
  );
};

export default ChartWidget;

import React from 'react';

import { Card, CardSettings } from '@keen.io/ui-core';

import {
  LayoutMain,
  TitlePosition,
  LegendPosition,
} from './chart-widget.styles';

import { LegendSettings } from '../types';

type Props = {
  title: () => React.ReactNode;
  legend: () => React.ReactNode;
  content: () => React.ReactNode;
  cardSettings: CardSettings;
  legendSettings: Pick<LegendSettings, 'position' | 'layout' | 'alignment'>;
};

const ChartWidget = ({
  title,
  legend,
  content,
  cardSettings,
  legendSettings,
}: Props) => {
  const legendComponent = legend();
  const titleComponent = title();
  const contentComponent = content();

  return (
    <Card {...cardSettings}>
      <TitlePosition>{titleComponent}</TitlePosition>
      <LayoutMain legendPosition={legendSettings.position}>
        {legendComponent && (
          <LegendPosition {...legendSettings}>{legendComponent}</LegendPosition>
        )}
        {contentComponent}
      </LayoutMain>
    </Card>
  );
};

export default ChartWidget;

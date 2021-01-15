import React from 'react';

import { Card, CardSettings } from '@keen.io/ui-core';

import { Layout, TitleSocket, LegendSocket } from './chart-widget.styles';

import { LegendSettings } from '../../types';

type Props = {
  /** Title renderer */
  title: () => React.ReactNode;
  /** Legend renderer */
  legend: () => React.ReactNode;
  /** Content renderer */
  content: () => React.ReactNode;
  /** Card component settings */
  cardSettings: CardSettings;
  /** Legend component settings */
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
      <TitleSocket data-testid="title-socket">{titleComponent}</TitleSocket>
      <Layout legendPosition={legendSettings.position}>
        {legendComponent && (
          <LegendSocket {...legendSettings} data-testid="legend-socket">
            {legendComponent}
          </LegendSocket>
        )}
        {contentComponent}
      </Layout>
    </Card>
  );
};

export default ChartWidget;

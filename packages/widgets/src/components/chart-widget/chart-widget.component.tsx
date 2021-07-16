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

const Widget = ({ title, legendSettings, content, legend }: Partial<Props>) => {
  const legendComponent = legend();
  const titleComponent = title();
  const contentComponent = content();
  return (
    <>
      <TitleSocket data-testid="title-socket">{titleComponent}</TitleSocket>
      <Layout legendPosition={legendSettings.position}>
        {legendComponent && (
          <LegendSocket {...legendSettings} data-testid="legend-socket">
            {legendComponent}
          </LegendSocket>
        )}
        {contentComponent}
      </Layout>
    </>
  );
};

const ChartWidget = ({
  title,
  legend,
  content,
  cardSettings,
  legendSettings,
}: Props) => (
  <Card {...cardSettings}>
    <Widget
      title={title}
      legendSettings={legendSettings}
      legend={legend}
      content={content}
    />
  </Card>
);

export default ChartWidget;

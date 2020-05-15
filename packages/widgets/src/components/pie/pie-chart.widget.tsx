import React, { FC, useState } from 'react';
import {
  PieChart,
  PieChartSettings,
  ResponsiveWrapper,
  SeriesLegend,
  theme as defaultTheme,
  OTHERS_DATA_KEY,
} from '@keen.io/charts';

import WidgetHeading from '../widget-heading.component';
import ChartWidget from '../chart-widget.component';
import {
  ContentSocket,
  LegendSocket,
  TitleSocket,
} from '../widget-sockets.component';

import { createLegendLabels } from './pie-chart.widget.utils';

import { legendSettings } from '../../widget-settings';
import { useLegend } from '../../hooks';

import { WidgetSettings } from '../../types';

type Props = WidgetSettings & PieChartSettings;

/** Pie Chart widget integrated with other components */
export const PieChartWidget: FC<Props> = ({
  legend = legendSettings,
  theme = defaultTheme,
  title,
  subtitle,
  card,
  ...props
}) => {
  const { disabledKeys, updateKeys } = useLegend();

  const [stackedElem, setStackedElem] = useState([]);

  return (
    <ChartWidget
      cardSettings={card}
      legendSettings={{
        position: legend.position,
        alignment: legend.alignment,
        layout: legend.layout,
      }}
    >
      <TitleSocket>
        <WidgetHeading title={title} subtitle={subtitle} />
      </TitleSocket>
      {legend.enabled && (
        <LegendSocket>
          <SeriesLegend
            {...legend}
            onClick={(key, disabled) => {
              if (key === OTHERS_DATA_KEY) {
                stackedElem.forEach(el => updateKeys(el, disabled));
              } else {
                updateKeys(key, disabled);
              }
            }}
            labels={createLegendLabels(
              props.data,
              theme.colors,
              props.labelSelector,
              stackedElem
            )}
          />
        </LegendSocket>
      )}
      <ContentSocket>
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <PieChart
              {...props}
              onDataStack={res => setStackedElem(res)}
              disabledLabels={disabledKeys}
              svgDimensions={{ width, height }}
              theme={theme}
            />
          )}
        </ResponsiveWrapper>
      </ContentSocket>
    </ChartWidget>
  );
};
export default PieChartWidget;

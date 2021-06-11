import React, { FC, useState } from 'react';
import {
  PieChart,
  PieChartSettings,
  ResponsiveWrapper,
  SeriesLegend,
  theme as defaultTheme,
  OTHERS_DATA_KEY,
} from '@keen.io/charts';
import { useLegend } from '@keen.io/react-hooks';

import WidgetHeading from '../widget-heading.component';
import ChartWidget from '../chart-widget';

import { createLegendLabels } from './pie-chart.widget.utils';

import { legendSettings } from '../../widget-settings';

import { WidgetSettings, LegendSettings } from '../../types';

type Props = { legend: LegendSettings } & WidgetSettings & PieChartSettings;

/** Pie Chart widget integrated with other components */
export const PieChartWidget: FC<Props> = ({
  legend = legendSettings,
  theme = defaultTheme,
  title,
  subtitle,
  card,
  tags,
  ...props
}) => {
  const { disabledKeys, updateKeys } = useLegend();

  const [stackedElem, setStackedElem] = useState([]);
  const [activeKey, setActiveKey] = useState(null);

  return (
    <ChartWidget
      cardSettings={card}
      legendSettings={{
        position: legend.position,
        alignment: legend.alignment,
        layout: legend.layout,
      }}
      title={() => (
        <WidgetHeading title={title} subtitle={subtitle} tags={tags} />
      )}
      legend={() =>
        legend.enabled && (
          <SeriesLegend
            {...legend}
            onClick={(key, disabled) => {
              if (key === OTHERS_DATA_KEY) {
                stackedElem.forEach((el) => updateKeys(el, disabled));
              } else {
                updateKeys(key, disabled);
              }
            }}
            onActivate={(label: string) => setActiveKey(label)}
            onDeactivate={() => setActiveKey(null)}
            labels={createLegendLabels(
              props.data,
              theme.colors,
              props.labelSelector,
              stackedElem
            )}
          />
        )
      }
      content={() => (
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <PieChart
              {...props}
              onDataStack={(res) => setStackedElem(res)}
              disabledLabels={disabledKeys}
              svgDimensions={{ width, height }}
              activeKey={activeKey}
              theme={theme}
            />
          )}
        </ResponsiveWrapper>
      )}
    />
  );
};
export default PieChartWidget;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';

import { Container, Option } from './widget-picker.styles';

import WidgetItem from '../widget-item';

import { WIDGETS } from '../../constants';
import { ChartSettings, WidgetSettings, PickerWidgets } from '../../types';

type Props = {
  /** Widgets available to select */
  widgets: PickerWidgets[];
  /** Curent selected widget */
  currentWidget: PickerWidgets;
  /** Chart settings */
  chartSettings: ChartSettings;
  /** Widget settings */
  widgetSettings: WidgetSettings;
  /** Click event handler */
  onUpdateSettings: (
    widget: PickerWidgets,
    chartSettings: ChartSettings
  ) => void;
};

export const WidgetPicker: FC<Props> = ({
  widgets,
  currentWidget,
  chartSettings,
  onUpdateSettings,
}) => (
  <Container>
    {WIDGETS.filter(({ widget }) => widgets.includes(widget)).map(
      ({ id, icon, widget, defaultChartSettings, chartOptions, isActive }) => {
        const isActiveWidget = isActive(currentWidget, chartSettings);
        return (
          <Option key={id} data-testid={`${id}-widget-option`}>
            <WidgetItem
              icon={icon}
              isActive={isActiveWidget}
              onClick={() => onUpdateSettings(widget, defaultChartSettings)}
              settings={chartSettings}
              chartConfigurationOptions={chartOptions}
              onUpdateSettings={settings =>
                onUpdateSettings(widget, {
                  ...defaultChartSettings,
                  ...settings,
                })
              }
            />
          </Option>
        );
      }
    )}
  </Container>
);

export default WidgetPicker;

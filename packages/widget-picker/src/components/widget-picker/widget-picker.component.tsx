/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';

import { Container, Option } from './widget-picker.styles';

import WidgetItem from '../widget-item';

import { WIDGETS } from '../../constants';
import { ChartSettings, PickerWidgets } from '../../types';

type Props = {
  /** Widgets available to select */
  widgets: PickerWidgets[];
  /** Curent selected widget */
  currentWidget: PickerWidgets;
  /** Current chart settings */
  chartSettings: ChartSettings;
  /** Click event handler */
  onUpdateWidgetSettings: (
    widget: PickerWidgets,
    chartSettings: ChartSettings
  ) => void;
};

export const WidgetPicker: FC<Props> = ({
  widgets,
  currentWidget,
  chartSettings,
  onUpdateWidgetSettings,
}) => (
  <Container>
    {WIDGETS.map(
      ({ id, icon, widget, defaultSettings, chartOptions, isActive }) => {
        const isWidgetActive = isActive(currentWidget, chartSettings);

        return (
          <Option key={id} data-testid={`${id}-widget-option`}>
            <WidgetItem
              icon={icon}
              isActive={isWidgetActive}
              onClick={() => onUpdateWidgetSettings(widget, defaultSettings)}
              settings={chartSettings}
              chartConfigurationOptions={chartOptions}
              onUpdateSettings={settings =>
                onUpdateWidgetSettings(widget, {
                  ...defaultSettings,
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

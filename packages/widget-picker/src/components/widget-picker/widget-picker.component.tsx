/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { Widgets } from '@keen.io/widgets';

import { Container, Option } from './widget-picker.styles';

import ChartSettings from '../chart-settings';
import WidgetItem from '../widget-item';

import { WIDGETS } from '../../constants';

import { Settings } from '../../types';

type Props = {
  /** Widgets available to select */
  availableWidgets: Widgets[];
  /** Curent selected widget */
  currentWidget: Widgets;
  /** Chart settings */
  chartSettings: Settings;
  /** Click event handler */
  onUpdateWidget: (widget: Widgets, settings: Settings) => void;
};

export const WidgetPicker: FC<Props> = ({
  currentWidget,
  chartSettings,
  availableWidgets,
  onUpdateWidget,
}) => {
  return (
    <Container>
      {WIDGETS.map(
        ({ id, icon, widget, defaultSettings, chartOptions, isActive }) => {
          const isWidgetActive = isActive(currentWidget, chartSettings);

          return (
            <Option key={id}>
              <WidgetItem
                isActive={isWidgetActive}
                onClick={() => onUpdateWidget(widget, defaultSettings)}
                settings={chartSettings}
                icon={icon}
              />
              <div>
                {chartOptions &&
                  chartOptions.map(options => (
                    <ChartSettings
                      key={options.id}
                      id={id}
                      isWidgetActive={isWidgetActive}
                      onClick={(_e, id, settings) => {
                        // @TODO: Get value from array to merge
                        const option = chartOptions.filter(
                          op => op.id !== options.id
                        );

                        onUpdateWidget(widget, {
                          ...defaultSettings,
                          ...settings,
                        });
                      }}
                      settings={chartSettings}
                      options={options.settings}
                    />
                  ))}
              </div>
            </Option>
          );
        }
      )}
    </Container>
  );
};

export default WidgetPicker;

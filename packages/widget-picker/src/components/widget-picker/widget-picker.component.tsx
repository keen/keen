import React, { FC } from 'react';

import {
  Container,
  OptionsContainer,
  OptionsGroupWrapper,
  WidgetContainer,
} from './widget-picker.styles';

import WidgetItem from '../widget-item';
import OptionsGroup from '../options-group';

import { mergeOptions } from '../../utils';
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
  /** Collection of widgets with disabled advanced settings */
  disabledWidgetOptions?: PickerWidgets[];
  /** Click event handler */
  onUpdateSettings: (
    widget: PickerWidgets,
    chartSettings: ChartSettings,
    widgetSettings: WidgetSettings
  ) => void;
};

export const WidgetPicker: FC<Props> = ({
  widgets,
  currentWidget,
  chartSettings,
  widgetSettings,
  onUpdateSettings,
  disabledWidgetOptions = [],
}) => (
  <Container>
    {WIDGETS.filter(({ widget }) => widgets.includes(widget)).map(
      ({
        id,
        icon,
        widget,
        defaultChartSettings,
        defaultWidgetSettings,
        chartOptions,
        widgetOptions,
        isActive,
      }) => {
        const isActiveWidget = isActive(currentWidget, chartSettings);
        return (
          <WidgetContainer key={id} data-testid={`${id}-widget-container`}>
            <WidgetItem
              icon={icon}
              hasOptions={
                !!(
                  (chartOptions || widgetOptions) &&
                  !disabledWidgetOptions.includes(widget)
                )
              }
              isActive={isActiveWidget}
              onClick={() =>
                onUpdateSettings(
                  widget,
                  defaultChartSettings,
                  defaultWidgetSettings
                )
              }
            >
              <OptionsContainer>
                {chartOptions &&
                  chartOptions.map(options => (
                    <OptionsGroupWrapper key={options.id}>
                      <OptionsGroup
                        id={options.id}
                        title={options.label}
                        isActiveOption={isActiveWidget}
                        onClick={(e, id, optionSettings) => {
                          e.stopPropagation();
                          const optionsGroup: ChartSettings = mergeOptions(
                            id,
                            chartOptions,
                            chartSettings
                          );

                          onUpdateSettings(
                            widget,
                            {
                              ...defaultChartSettings,
                              ...optionsGroup,
                              ...optionSettings,
                            },
                            widgetSettings
                          );
                        }}
                        settings={chartSettings}
                        options={options.settings}
                      />
                    </OptionsGroupWrapper>
                  ))}
                {widgetOptions &&
                  widgetOptions.map(options => (
                    <OptionsGroupWrapper key={options.id}>
                      <OptionsGroup
                        id={options.id}
                        title={options.label}
                        isActiveOption={isActiveWidget}
                        onClick={(e, id, optionSettings) => {
                          e.stopPropagation();
                          const optionsGroup: WidgetSettings = mergeOptions(
                            id,
                            widgetOptions,
                            widgetSettings
                          );

                          onUpdateSettings(widget, chartSettings, {
                            ...defaultWidgetSettings,
                            ...optionsGroup,
                            ...optionSettings,
                          });
                        }}
                        settings={widgetSettings}
                        options={options.settings}
                      />
                    </OptionsGroupWrapper>
                  ))}
              </OptionsContainer>
            </WidgetItem>
          </WidgetContainer>
        );
      }
    )}
  </Container>
);

export default WidgetPicker;

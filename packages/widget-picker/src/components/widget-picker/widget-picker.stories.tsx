/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import { WidgetPicker } from './widget-picker.component';
import { PickerWidgets } from '../../types';

export default {
  title: 'Others/Components/ Widget Picker',
  parameters: {
    component: WidgetPicker,
    componentSubtitle: 'Visualization widget picker ',
  },
};

export const basic = () => {
  const [widget, setWidget] = React.useState<PickerWidgets>('bar');
  const [chartSettings, setChartSettings] = React.useState({});
  const [widgetSettings, setWidgetSettings] = React.useState({});

  return (
    <WidgetPicker
      currentWidget={widget}
      chartSettings={chartSettings}
      widgetSettings={widgetSettings}
      widgets={[
        'table',
        'json',
        'bar',
        'line',
        'metric',
        'choropleth',
        'heatmap',
      ]}
      onUpdateSettings={(widget, chartSettings, widgetSettings) => {
        setWidget(widget);
        setChartSettings(chartSettings);
        setWidgetSettings(widgetSettings);
      }}
    />
  );
};

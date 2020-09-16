/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import { WidgetPicker } from './widget-picker.component';
import { PickerWidgets } from '../../types';

export default {
  title: 'Components| Widget Picker',
  parameters: {
    component: WidgetPicker,
    componentSubtitle: 'Visualization widget picker ',
  },
};

export const basic = () => {
  const [widget, setWidget] = React.useState<PickerWidgets>('bar');
  const [chartSettings, setChartSettings] = React.useState({});
  const [widgetSettings] = React.useState({});

  return (
    <WidgetPicker
      currentWidget={widget}
      chartSettings={chartSettings}
      widgetSettings={widgetSettings}
      widgets={['bar', 'line', 'choropleth']}
      onUpdateSettings={(widget, settings) => {
        setWidget(widget);
        setChartSettings(settings);
        console.log(widget, settings);
      }}
    />
  );
};

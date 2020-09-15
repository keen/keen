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
  const [settings, setWidgetSettings] = React.useState({});

  return (
    <WidgetPicker
      currentWidget={widget}
      chartSettings={settings}
      widgets={['bar', 'line']}
      onUpdateWidgetSettings={(widget, settings) => {
        setWidget(widget);
        setWidgetSettings(settings);
        console.log(widget, settings);
      }}
    />
  );
};

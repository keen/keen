/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { Widgets } from '@keen.io/widgets';

import { WidgetPicker } from './widget-picker.component';

export default {
  title: 'Components| Widget Picker',

  parameters: {
    component: WidgetPicker,
    componentSubtitle: 'Visualization widget picker ',
  },
};

export const basic = () => {
  const [widget, setWidget] = React.useState<Widgets>('bar');
  const [settings, setWidgetSettings] = React.useState({});

  return (
    <WidgetPicker
      currentWidget={widget}
      chartSettings={settings}
      availableWidgets={['bar', 'line']}
      onUpdateWidget={(widget, settings) => {
        setWidget(widget);
        setWidgetSettings(settings);
        console.log(widget, settings);
      }}
    />
  );
};

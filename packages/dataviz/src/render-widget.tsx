import React from 'react';
import {
  BarChartWidget,
  LineChartWidget,
  PieChartWidget,
} from '@keen.io/widgets';

import { WidgetSettings } from './types';

export type Widgets = 'bar' | 'line' | 'pie';

type Options = {
  type: Widgets;
  keys: string[];
  formatLabel: (label: string | number) => string | number;
  data: any[];
  widgetSettings?: WidgetSettings;
};

export const renderWidget = ({
  type,
  formatLabel,
  keys,
  data,
  widgetSettings,
}: Options) => {
  switch (type) {
    case 'pie':
      return <PieChartWidget keys={keys} labelSelector="name" data={data} />;
    case 'bar':
      return (
        <BarChartWidget
          keys={keys}
          formatLabel={formatLabel}
          labelSelector="name"
          data={data}
        />
      );
    case 'line':
      return (
        <LineChartWidget
          keys={keys}
          formatLabel={formatLabel}
          labelSelector="name"
          data={data}
          {...widgetSettings}
        />
      );
  }
};

import React from 'react';
import {
  BarChartWidget,
  LineChartWidget,
  PieChartWidget,
} from '@keen.io/widgets';
import { ScaleSettings } from '@keen.io/charts';
import { Query } from '@keen.io/parser';

import { WidgetSettings } from './types';

export type Widgets = 'bar' | 'line' | 'pie';

type Options = {
  type: Widgets;
  keys: string[];
  data: any[];
  query: Query;
  scaleSettings: Partial<ScaleSettings>;
  widgetSettings?: WidgetSettings;
};

export const renderWidget = ({
  type,
  keys,
  data,
  scaleSettings,
  widgetSettings,
}: Options) => {
  switch (type) {
    case 'pie':
      return <PieChartWidget keys={keys} labelSelector="name" data={data} />;
    case 'bar':
      return (
        <BarChartWidget
          keys={keys}
          xScaleSettings={{ type: 'band', ...scaleSettings }}
          labelSelector="name"
          data={data}
        />
      );
    case 'line':
      return (
        <LineChartWidget
          xScaleSettings={{
            type: 'time',
            ...scaleSettings,
          }}
          keys={keys}
          labelSelector="name"
          data={data}
          {...widgetSettings}
        />
      );
  }
};

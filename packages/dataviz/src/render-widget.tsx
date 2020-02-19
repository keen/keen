import React from 'react';
import {
  BarChartWidget,
  LineChartWidget,
  PieChartWidget,
} from '@keen.io/widgets';
import { ScaleSettings } from '@keen.io/charts';
import { Query } from '@keen.io/parser';

import { WidgetSettings, ComponentSettings } from './types';

export type Widgets = 'bar' | 'line' | 'pie';

type Options = {
  type: Widgets;
  keys: string[];
  data: any[];
  query: Query;
  scaleSettings: Partial<ScaleSettings>;
  componentSettings?: ComponentSettings;
  widgetSettings?: WidgetSettings;
};

export const renderWidget = ({
  type,
  keys,
  data,
  scaleSettings,
  componentSettings,
  widgetSettings,
}: Options) => {
  const config = {
    keys,
    data,
    labelSelector: 'name',
    ...componentSettings,
    ...widgetSettings,
  };
  switch (type) {
    case 'pie':
      return <PieChartWidget {...config} />;
    case 'bar':
      return (
        <BarChartWidget
          xScaleSettings={{ type: 'band', ...scaleSettings }}
          {...config}
        />
      );
    case 'line':
      return (
        <LineChartWidget
          xScaleSettings={{
            type: 'time',
            ...scaleSettings,
          }}
          {...config}
        />
      );
  }
};

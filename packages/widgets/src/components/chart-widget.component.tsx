import React from 'react';
import { Card } from '@keen/ui-core';

import { getLegendJSX, getContentJSX } from './widget-sockets.component';

type Props = {
  children: React.ReactNode;
};

const ChartWidget = ({ children }: Props) => {
  const elements = React.Children.toArray(children);
  const legend = elements.find(getLegendJSX);
  const content = elements.find(getContentJSX) as React.ReactElement;

  return (
    <Card>
      {legend}
      {content}
    </Card>
  );
};

export default ChartWidget;

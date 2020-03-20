import React from 'react';
import LineChart, { Props } from './line-chart.component';

export const AreaChart = (props: Props) => {
  return <LineChart {...props} areaMode={true} />;
};

export default AreaChart;

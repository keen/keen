/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { timeFormat } from 'd3-time-format';

import { BarChart } from '../charts/bar/bar-chart.component';
import { AreaChart } from '../charts/area/area-chart.component';
import { BubbleChart } from '../charts/bubble/bubble-chart.component';
import { ChoroplethChart } from '../charts/choropleth/choropleth-chart.component';
import { DonutChart } from '../charts/donut/donut-chart.component';
import { FunnelChart } from '../charts/funnel/funnel-chart.component';
import { GaugeChart } from '../charts/gauge/gauge-chart.component';
import Heatmap from '../charts/heatmap/heatmap-chart.component';
import { LineChart } from '../charts/line/line-chart.component';
import { MetricChart } from '../charts/metric/metric-chart.component';
import { PieChart } from '../charts/pie/pie-chart.component';
import TableChart from '../charts/table/table-chart.component';

import { chartData as barChartData } from '../charts/bar/bar-chart.fixtures';
import { chartData as areaChartData } from '../charts/line/line-chart.fixtures';
import { chartData as bubbleChartData } from '../charts/bubble/bubble-chart.fixtures';
import { chartData as choroplethChartData } from '../charts/choropleth/choropleth-chart.fixtures';
import { chartData as gaugeChartData } from '../charts/gauge/gauge-chart.fixtures';
import { chartData as heatmapChartData } from '../charts/heatmap/heatmap-chart.fixtures';
import { chartData as lineChartData } from '../charts/line/line-chart.fixtures';
import { chartData as metricChartData } from '../charts/metric/metric-chart.fixtures';

import { fetchMapTopology } from '../charts/choropleth/utils';

import { theme as keenTheme } from '../theme';

const DIMENSION = { width: 480, height: 200 };
const SVG_DIMENSION = { width: DIMENSION.width, height: DIMENSION.height };

const funnelChartData = [
  { name: 'Logins', value: 5900 },
  { name: 'Purchases', value: 4021 },
  { name: 'Payments', value: 2330 },
];

const pieChartData = [
  { name: 'Books', buy: 10, sold: 12 },
  { name: 'Apps', buy: 20, sold: 12 },
  { name: 'Games', buy: 5, sold: 34 },
  { name: 'Cars', buy: 12, sold: 25 },
  { name: 'Bikes', buy: 2, sold: 10 },
];

const tableChartData = [
  {
    platform: 'Web',
    referrer: 'google/ads',
    price: 0.5,
    city: 'Shenyang',
  },
  {
    platform: 'Mobile',
    referrer: 'google/ads',
    price: 0.5,
    city: 'Parsons',
  },
  {
    platform: 'Web',
    referrer: 'google/ads',
    price: 1.5,
    city: 'Shenyang',
  },
  {
    platform: 'Web',
    referrer: 'facebook/cpc',
    price: 0.5,
    city: 'Shenyang',
  },
  {
    platform: 'Web',
    referrer: 'google/ads',
    price: 0.5,
    city: 'Parsons',
  },
  {
    platform: 'Mobile',
    referrer: 'google/ads',
    price: 2.5,
    city: 'Shenyang',
  },
  {
    platform: 'Web',
    referrer: 'google/ads',
    price: 0.5,
    city: 'Parsons',
  },
  {
    platform: 'Mobile',
    referrer: 'facebook/cpc',
    price: 10.5,
    city: 'Parsons',
  },
  {
    platform: 'Web',
    referrer: 'google/ads',
    price: 0.5,
    city: 'Shenyang',
  },
  {
    platform: 'Mobile',
    referrer: 'google/ads',
    price: 0.5,
    city: 'Parsons',
  },
  {
    platform: 'Web',
    referrer: 'google/ads',
    price: 1.5,
    city: 'Shenyang',
  },
  {
    platform: 'Web',
    referrer: 'facebook/cpc',
    price: 0.5,
    city: 'Shenyang',
  },
  {
    platform: 'Web',
    referrer: 'google/ads',
    price: 0.5,
    city: 'Parsons',
  },
  {
    platform: 'Mobile',
    referrer: 'google/ads',
    price: 2.5,
    city: 'Shenyang',
  },
  {
    platform: 'Web',
    referrer: 'google/ads',
    price: 0.5,
    city: 'Parsons',
  },
  {
    platform: 'Mobile',
    referrer: 'facebook/cpc',
    price: 10.5,
    city: 'Parsons',
  },
];

export default {
  title: 'Chart List',
};

export const barChartPlot = () => (
  <div style={SVG_DIMENSION}>
    <BarChart
      data={barChartData}
      svgDimensions={SVG_DIMENSION}
      labelSelector="name"
      theme={keenTheme}
      margins={{ top: 50, right: 20, bottom: 60, left: 65 }}
      layout="vertical"
      minValue="auto"
      maxValue="auto"
      keys={['users', 'licenses', 'shops']}
      disabledKeys={[]}
      stackMode="normal"
      groupMode="grouped"
      xScaleSettings={{ type: 'band' }}
      yScaleSettings={{ type: 'linear' }}
      barPadding={0.1}
      showValues={false}
      valuesAutocolor={true}
    />
  </div>
);

export const areaChartPlot = () => (
  <div style={SVG_DIMENSION}>
    <AreaChart
      labelSelector="name"
      keys={['users', 'books', 'licenses', 'shops']}
      markRadius={4}
      strokeWidth={2}
      curve={'spline'}
      xScaleSettings={{
        type: 'time',
        precision: 'month',
        formatLabel: date => {
          const format = timeFormat('%d %b');
          return format(date);
        },
      }}
      gradient={true}
      svgDimensions={SVG_DIMENSION}
      margins={{ top: 50, right: 30, bottom: 60, left: 60 }}
      theme={keenTheme}
      data={areaChartData}
    />
  </div>
);

export const bubbleChartPlot = () => (
  <div style={SVG_DIMENSION}>
    <BubbleChart
      labelSelector="channel"
      valueKey="cost"
      xDomainKey="users"
      yDomainKey="conversion"
      minAreaRadius={5}
      maxAreaRadius={40}
      svgDimensions={SVG_DIMENSION}
      margins={{ top: 50, right: 40, bottom: 60, left: 80 }}
      theme={keenTheme}
      data={bubbleChartData}
    />
  </div>
);

export const choroplethChartPlot = () => {
  const [topology, setTopology] = React.useState(null);
  React.useEffect(() => {
    fetchMapTopology('world').then(mapTopology => {
      setTopology(mapTopology);
    });
  }, []);

  if (!topology) return null;

  return (
    <div style={SVG_DIMENSION}>
      <ChoroplethChart
        labelSelector="geo.country"
        geoKey="geo.country"
        valueKey="result"
        colorSteps={5}
        colorMode={'continuous'}
        topology={topology}
        projectionScale={100}
        svgDimensions={SVG_DIMENSION}
        margins={{ top: 50, right: 20, bottom: 50, left: 40 }}
        theme={keenTheme}
        data={choroplethChartData}
      />
    </div>
  );
};

export const donutChartPlot = () => (
  <div style={SVG_DIMENSION}>
    <DonutChart
      data={pieChartData}
      theme={keenTheme}
      keys={['buy', 'sold']}
      labelsAutocolor={true}
      labelsPosition={'inside'}
      svgDimensions={SVG_DIMENSION}
      margins={{ top: 10, right: 10, bottom: 10, left: 10 }}
      innerRadius={0.6}
    />
  </div>
);

export const funnelChartPlot = () => (
  <div style={SVG_DIMENSION}>
    <FunnelChart
      labelSelector="name"
      layout={'vertical'}
      svgDimensions={SVG_DIMENSION}
      margins={{ top: 0, right: 0, bottom: 0, left: 0 }}
      theme={keenTheme}
      data={funnelChartData}
    />
  </div>
);

export const gaugeChartPlot = () => (
  <div style={SVG_DIMENSION}>
    <GaugeChart
      data={gaugeChartData}
      valueKey="keen.value"
      labelSelector="keen.key"
      minValue={0}
      maxValue={200}
      theme={keenTheme}
      svgDimensions={SVG_DIMENSION}
      margins={{ top: 10, right: 10, bottom: 10, left: 10 }}
    />
  </div>
);

export const heatmapChartPlot = () => (
  <div style={SVG_DIMENSION}>
    <Heatmap
      padding={2}
      layout={'vertical'}
      colorMode={'continuous'}
      steps={2}
      labelSelector="name"
      keys={['users', 'licenses', 'shops']}
      svgDimensions={SVG_DIMENSION}
      margins={{ top: 10, right: 10, bottom: 40, left: 80 }}
      theme={keenTheme}
      data={heatmapChartData}
    />
  </div>
);

export const lineChartPlot = () => (
  <div style={SVG_DIMENSION}>
    <LineChart
      labelSelector="name"
      keys={['users', 'books', 'licenses', 'shops']}
      xScaleSettings={{
        type: 'time',
        precision: 'month',
        formatLabel: date => {
          const format = timeFormat('%d %b');
          return format(date);
        },
      }}
      markRadius={4}
      strokeWidth={2}
      curve={'spline'}
      gradient={true}
      svgDimensions={SVG_DIMENSION}
      margins={{ top: 50, right: 30, bottom: 60, left: 60 }}
      theme={keenTheme}
      data={lineChartData}
    />
  </div>
);

export const metricChartPlot = () => (
  <div style={{ ...SVG_DIMENSION, height: 120 }}>
    <MetricChart
      labelSelector="day"
      caption={'Metric caption'}
      type={'percent'}
      keys={['users']}
      theme={keenTheme}
      data={metricChartData}
    />
  </div>
);

export const pieChartPlot = () => (
  <div style={SVG_DIMENSION}>
    <PieChart
      data={pieChartData}
      theme={keenTheme}
      keys={['buy', 'sold']}
      labelsAutocolor={true}
      labelsPosition={'inside'}
      svgDimensions={SVG_DIMENSION}
      margins={{ top: 10, right: 10, bottom: 10, left: 10 }}
    />
  </div>
);

export const tableChartPlot = () => (
  <div style={SVG_DIMENSION}>
    <TableChart data={tableChartData} color={'#27566d'} />
  </div>
);

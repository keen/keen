import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';
import BarChart from './bar-chart.component';

import { theme as defaultTheme } from '../../theme';
import { chartData as data } from './bar-chart.fixtures';

const render = (overProps: any = {}) => {
  const labelSelector = 'name';
  const keys = ['users', 'licenses', 'shops'];
  const props = {
    data,
    labelSelector,
    keys,
    svgDimensions: { width: 100, height: 100 },
    theme: defaultTheme,
    ...overProps,
  };

  const wrapper = rtlRender(<BarChart {...props} />);
  return {
    wrapper,
    props,
  };
};

const mockedRect = {
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 10,
  height: 12,
  toJSON: () => '',
};

const originalGetBBox = (SVGElement as any).prototype.getBBox;
const originalGetComputedTextLength = (SVGElement as any).prototype
  .getComputedTextLength;

beforeAll(() => {
  (SVGElement as any).prototype.getBBox = () => {
    return mockedRect;
  };
  (SVGElement as any).prototype.getComputedTextLength = () => {
    return 10;
  };
  registerTimezone('UTC');
});

afterAll(() => {
  (SVGElement as any).prototype.getBBox = originalGetBBox;
  (SVGElement as any).prototype.getComputedTextLength = originalGetComputedTextLength;
  unregisterTimezone();
});

test('chart to be rendered', () => {
  const {
    wrapper: { container },
  } = render();
  const chart = container.querySelector('svg');
  expect(chart).toBeInTheDocument();
});

test('shows tooltip value', async () => {
  const {
    wrapper: { getByText, container },
    props: { data },
  } = render();
  const [firstSeries] = data;
  const { users } = firstSeries;
  const barElement = container.querySelector('rect');

  fireEvent.mouseEnter(barElement);

  await waitFor(() => {
    expect(getByText(users.toString())).toBeInTheDocument();
  });
});

test('formats tooltip value', async () => {
  const formatTooltip = (value) => `$${value}`;
  const {
    wrapper: { getByText, container },
    props: { data },
  } = render({ tooltipSettings: { formatValue: formatTooltip } });
  const [firstSeries] = data;
  const { users } = firstSeries;
  const formattedValue = formatTooltip(users);
  const barElement = container.querySelector('rect');

  fireEvent.mouseEnter(barElement);

  await waitFor(() => {
    expect(getByText(formattedValue)).toBeInTheDocument();
  });
});

test('should disable tooltips', async () => {
  const modifiedTheme = {
    ...defaultTheme,
    tooltip: {
      enabled: false,
    },
  };
  const {
    wrapper: { queryByText, container },
    props: { data },
  } = render({ theme: modifiedTheme });
  const [firstSeries] = data;
  const { users } = firstSeries;
  const barElement = container.querySelector('rect');

  fireEvent.mouseEnter(barElement);

  await waitFor(() => {
    expect(queryByText(users.toString())).toBeNull();
  });
});

test('renders horizontal axis title', () => {
  const xAxisTitle = 'Horizontal Title';
  const {
    wrapper: { getByText },
  } = render({ xAxisTitle });

  expect(getByText(xAxisTitle)).toBeInTheDocument();
});

test('renders vertical axis title', () => {
  const yAxisTitle = 'Vertical Title';
  const {
    wrapper: { getByText },
  } = render({ yAxisTitle });

  expect(getByText(yAxisTitle)).toBeInTheDocument();
});

test('should render <Grid> lines by default', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  expect(getByTestId('grid-x-0')).toBeInTheDocument();
  expect(getByTestId('grid-y-0')).toBeInTheDocument();
});

test('should apply color for <Grid> lines from theme', () => {
  const {
    wrapper: { getByTestId },
    props: { theme },
  } = render();

  const horizontalLine = getByTestId('grid-x-0');
  const verticalLine = getByTestId('grid-y-0');

  expect(horizontalLine.style.stroke).toEqual(theme.gridX.color);
  expect(verticalLine.style.stroke).toEqual(theme.gridY.color);
});

test('should disable <Grid> lines', () => {
  const modifiedTheme = {
    ...defaultTheme,
    gridX: { enabled: false },
    gridY: { enabled: false },
  };
  const {
    wrapper: { queryByTestId },
  } = render({ theme: modifiedTheme });

  expect(queryByTestId('grid-x-0')).toBeNull();
  expect(queryByTestId('grid-y-0')).toBeNull();
});

test('should render <ZeroIntersection> line by default', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  expect(getByTestId('zero-intersection')).toBeInTheDocument();
});

test('should apply color for <ZeroIntersection> line from theme', () => {
  const {
    wrapper: { getByTestId },
    props: { theme },
  } = render();

  const horizontalLine = getByTestId('zero-intersection');

  expect(horizontalLine.style.stroke).toEqual(theme.zeroIntersection.color);
});

test('should disable <ZeroIntersection> line for vertical chart', () => {
  const modifiedTheme = {
    ...defaultTheme,
    gridY: { enabled: false },
  };
  const {
    wrapper: { queryByTestId },
  } = render({ theme: modifiedTheme, layout: 'vertical' });

  expect(queryByTestId('zero-intersection')).toBeNull();
});

test('should disable <ZeroIntersection> line for horizontal chart', () => {
  const modifiedTheme = {
    ...defaultTheme,
    gridX: { enabled: false },
  };
  const {
    wrapper: { queryByTestId },
  } = render({ theme: modifiedTheme, layout: 'horizontal' });

  expect(queryByTestId('zero-intersection')).toBeNull();
});

test('renders Axes based on theme settings', () => {
  const {
    wrapper: { getByTestId },
    props: { theme },
  } = render();

  const horizontalLine = getByTestId('ruler-horizontal');
  const verticalLine = getByTestId('ruler-vertical');

  expect(horizontalLine.style.fontFamily).toEqual(
    theme.axisX.labels.typography.fontFamily
  );
  expect(horizontalLine.style.fontSize).toEqual(
    `${theme.axisX.labels.typography.fontSize}px`
  );
  expect(verticalLine.style.fontFamily).toEqual(
    theme.axisY.labels.typography.fontFamily
  );
  expect(verticalLine.style.fontSize).toEqual(
    `${theme.axisY.labels.typography.fontSize}px`
  );
});

test('should disable Axes', () => {
  const modifiedTheme = {
    ...defaultTheme,
    axisX: {
      ...defaultTheme.axisX,
      enabled: false,
    },
  };
  const {
    wrapper: { queryByTestId },
  } = render({ theme: modifiedTheme });

  expect(queryByTestId('ruler-horizontal')).toBeNull();
});

test('should show values on the chart', () => {
  const {
    wrapper: { getByText },
  } = render({ showValues: true });

  expect(getByText('3')).toBeInTheDocument();
});

test('should hide values on the chart', () => {
  const {
    wrapper: { queryByText },
  } = render({ showValues: false });

  expect(queryByText('3')).toBeNull();
});

test('should render values on the chart based on theme', () => {
  const {
    wrapper: { getByText },
    props: { theme },
  } = render({ showValues: true, valuesAutocolor: false });
  const value = getByText('3');

  expect(value.style.fontFamily).toEqual(
    theme.bar.values.typography.fontFamily
  );
  expect(value.style.fontSize).toEqual(
    `${theme.bar.values.typography.fontSize}px`
  );
  expect(value.getAttribute('fill')).toEqual(
    theme.bar.values.typography.fontColor
  );
});

test('should adjust value color', () => {
  const {
    wrapper: { getByText },
  } = render({ showValues: true });
  const value = getByText('3');

  expect(value.getAttribute('fill')).toEqual('hsl(194.5, 34.1%, 15%)');
});

test('should render scale domain vertically', () => {
  const {
    wrapper: { getByTestId },
  } = render();
  const ruler = getByTestId('ruler-vertical');
  const maxScaleValue = within(ruler).getByText('90');

  expect(maxScaleValue).toBeTruthy();
});

test('should render scale domain horizontally', () => {
  const {
    wrapper: { getByTestId },
  } = render({ layout: 'horizontal' });
  const ruler = getByTestId('ruler-horizontal');
  const maxScaleValue = within(ruler).getByText('90');

  expect(maxScaleValue).toBeTruthy();
});

test('should set min/max values for domain', () => {
  const minValue = 20;
  const maxValue = 200;
  const {
    wrapper: { getByTestId },
  } = render({ layout: 'horizontal', minValue, maxValue });

  const ruler = getByTestId('ruler-horizontal');
  const labels = ruler.querySelectorAll('text');
  const minScaleValue = labels[0];
  const maxScaleValue = labels[labels.length - 1];

  expect(minScaleValue.textContent).toEqual(minValue.toString());
  expect(maxScaleValue.textContent).toEqual(maxValue.toString());
});

test('should set <Bar> background on hover', async () => {
  const {
    wrapper: { container },
  } = render();
  const rects = container.querySelectorAll('rect');
  fireEvent.mouseEnter(rects[0]);

  await waitFor(() => {
    expect(rects[0].getAttribute('fill')).toEqual('rgba(133,180,195,0.95)');
    expect(rects[1].getAttribute('fill')).toEqual('#CB5623');
    expect(rects[4].getAttribute('fill')).toEqual('#CB5623');
    expect(rects[5].getAttribute('fill')).toEqual('#E29B1E');
  });
});

test('should set <Bar> background on hover for stacked normal', async () => {
  const {
    wrapper: { container },
  } = render({ groupMode: 'stacked' });
  const rects = container.querySelectorAll('rect');

  fireEvent.mouseEnter(rects[0]);

  await waitFor(() => {
    expect(rects[0].getAttribute('fill')).toEqual('#85B4C3');
    expect(rects[1].getAttribute('fill')).toEqual('#85B4C3');
    expect(rects[4].getAttribute('fill')).toEqual('rgba(203,86,35,0.6)');
    expect(rects[5].getAttribute('fill')).toEqual('rgba(203,86,35,0.6)');
  });
});

test('should set <Bar> background on hover for stacked percent', async () => {
  const {
    wrapper: { container },
  } = render({ groupMode: 'stacked', stackMode: 'percent' });
  const rects = container.querySelectorAll('rect');

  fireEvent.mouseEnter(rects[0]);

  await waitFor(() => {
    expect(rects[0].getAttribute('fill')).toEqual('rgba(133,180,195,0.95)');
    expect(rects[1].getAttribute('fill')).toEqual('#85B4C3');
    expect(rects[4].getAttribute('fill')).toEqual('rgba(203,86,35,0.95)');
    expect(rects[5].getAttribute('fill')).toEqual('#CB5623');
  });
});

test('should create motion for vertical layout', () => {
  const {
    wrapper: { container },
  } = render();
  const rects = container.querySelectorAll('rect');

  expect(rects[0].getAttribute('height')).toEqual('0px');
});

test('should create motion for horizontal layout', () => {
  const {
    wrapper: { container },
  } = render({ layout: 'horizontal' });
  const rects = container.querySelectorAll('rect');

  expect(rects[0].getAttribute('width')).toEqual('0px');
});

test('should create motion for stacked chart', () => {
  const {
    wrapper: { container },
  } = render({ groupMode: 'stacked' });
  const rects = container.querySelectorAll('rect');

  expect(rects[0].getAttribute('width')).not.toEqual('0px');
  expect(rects[0].getAttribute('height')).not.toEqual('0px');
});

test('renders tooltip label with normalized date', () => {
  const data = [
    {
      'keen.key': '2019-05-01T00:00:00.000Z',
      'Edwidge Danticat': 121,
      'George R. R. Martin': 64,
      'J.K. Rowling': 82,
      'Stephen King': 6,
    },
  ];
  const keys = [
    'Edwidge Danticat',
    'George R. R. Martin',
    'J.K. Rowling',
    'Stephen King',
  ];
  const selectors = [{ selector: [0, 'Edwidge Danticat'], color: '#85B4C3' }];
  const xScaleSettings = { type: 'band', precision: 'month' };
  const labelSelector = 'keen.key';

  const {
    wrapper: { getByText },
  } = render({ data, keys, selectors, labelSelector, xScaleSettings });

  expect(
    getByText('2019-05-01T00:00:00.000Z UTC (MockDate: GMT+0000)')
  ).toBeInTheDocument();
});

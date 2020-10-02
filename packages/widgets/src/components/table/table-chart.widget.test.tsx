import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import { TableChartWidget } from './table-chart.widget';

import { widgetSettings } from '../../widget-settings';
import { chartData } from './table-chart.widget.fixtures';

const render = (overProps: any = {}) => {
  const props = {
    data: chartData,
    ...widgetSettings,
    ...overProps,
  };

  const wrapper = rtlRender(<TableChartWidget {...props} />);

  return {
    wrapper,
    props,
  };
};

test('do not renders widget heading section', () => {
  const {
    wrapper: { queryByTestId },
  } = render();

  expect(queryByTestId('widget-heading')).not.toBeInTheDocument();
});

test('renders widget title', () => {
  const title = {
    ...widgetSettings.title,
    content: 'title',
  };
  const {
    wrapper: { getByText },
  } = render({ title });
  const titleElement = getByText(title.content);

  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toMatchSnapshot();
});

test('renders widget subtitle', () => {
  const subtitle = {
    ...widgetSettings.subtitle,
    content: 'subtitle',
  };
  const {
    wrapper: { getByText },
  } = render({ subtitle });
  const titleElement = getByText(subtitle.content);

  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toMatchSnapshot();
});

test('renders table plot component', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  expect(getByTestId('table-chart-plot')).toBeInTheDocument();
});

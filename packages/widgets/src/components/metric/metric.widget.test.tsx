import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import MetricChartWidget from './metric.widget';
import { chartData } from './metric.widget.fixtures';

const render = (overProps: any = {}) => {
  const props = {
    title: '',
    subtitle: '',
    data: chartData,
    ...overProps,
  };

  const wrapper = rtlRender(<MetricChartWidget {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders metric title correctly', () => {
  const title = {
    content: 'Metric title',
  };
  const {
    wrapper: { getByTestId, getByText },
  } = render({ title });

  const widgetHeading = getByTestId('widget-heading');

  expect(widgetHeading).toContainElement(getByText('Metric title'));
});

test('renders metric subtitle correctly', () => {
  const subtitle = {
    content: 'Metric subtitle',
  };
  const {
    wrapper: { getByTestId, getByText },
  } = render({ subtitle });

  const widgetHeading = getByTestId('widget-heading');

  expect(widgetHeading).toContainElement(getByText('Metric subtitle'));
});

test('renders metric title and subtitle correctly', () => {
  const title = {
    content: 'Metric title',
  };
  const subtitle = {
    content: 'Metric subtitle',
  };
  const {
    wrapper: { getByTestId, getByText },
  } = render({ title, subtitle });

  const widgetHeading = getByTestId('widget-heading');

  expect(widgetHeading).toContainElement(getByText('Metric title'));
  expect(widgetHeading).toContainElement(getByText('Metric subtitle'));
});

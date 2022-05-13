import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import MetricChartWidget from './metric.widget';
import { chartData } from './metric.widget.fixtures';
import { widgetSettings } from '../../widget-settings';

const render = (
  overProps: Partial<ComponentProps<typeof MetricChartWidget>> = {}
) => {
  const props = {
    title: {
      content: '',
      typography: widgetSettings.title.typography,
    },
    subtitle: {
      content: '',
      typography: widgetSettings.subtitle.typography,
    },
    tags: [],
    card: {
      enabled: true,
    },
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

test('renders metric tags with title correctly', () => {
  const title = {
    content: 'Metric title',
  };
  const tags = [
    {
      label: 'Tag',
      variant: 'gray',
    },
  ];
  const {
    wrapper: { getByTestId, getByText },
  } = render({ title, tags });

  const widgetHeading = getByTestId('widget-heading');

  expect(widgetHeading).toContainElement(getByText('Metric title'));
  expect(widgetHeading).toContainElement(getByText('Tag'));
});

test('renders metric tags with subtitle correctly', () => {
  const subtitle = {
    content: 'Metric subtitle',
  };
  const tags = [
    {
      label: 'Tag',
      variant: 'gray',
    },
  ];
  const {
    wrapper: { getByTestId, getByText },
  } = render({ subtitle, tags });

  const widgetHeading = getByTestId('widget-heading');

  expect(widgetHeading).toContainElement(getByText('Metric subtitle'));
  expect(widgetHeading).toContainElement(getByText('Tag'));
});

test('renders metric tags without title and subtitle correctly', () => {
  const tags = [
    {
      label: 'Tag',
      variant: 'gray',
    },
  ];
  const {
    wrapper: { getByTestId, getByText },
  } = render({ tags });

  const widgetHeading = getByTestId('widget-heading');

  expect(widgetHeading).toContainElement(getByText('Tag'));
});

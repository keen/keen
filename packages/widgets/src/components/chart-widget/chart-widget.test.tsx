import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Alignment, Layout, Position } from '@keen.io/ui-core';

import ChartWidget from './chart-widget.component';
import WidgetHeading from '../widget-heading.component';

const render = (
  overProps: Partial<ComponentProps<typeof ChartWidget>> = {}
) => {
  const props = {
    title: () => null,
    legend: () => null,
    content: () => null,
    cardSettings: {
      enabled: true,
    },
    legendSettings: {
      position: 'top' as Position,
      layout: 'horizontal' as Layout,
      alignment: 'center' as Alignment,
    },
    ...overProps,
  };

  const wrapper = rtlRender(<ChartWidget {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders content component', () => {
  const content = () => <div data-testid="content" />;
  const {
    wrapper: { getByTestId },
  } = render({ content });

  expect(getByTestId('content')).toBeInTheDocument();
});

test('renders component as a children of title socket', () => {
  const title = () => <div data-testid="title" />;
  const {
    wrapper: { getByTestId },
  } = render({ title });

  const titleSocket = getByTestId('title-socket');

  expect(titleSocket).toContainElement(getByTestId('title'));
});

test('do not renders legend socket', () => {
  const {
    wrapper: { queryByTestId },
  } = render();

  expect(queryByTestId('legend-socket')).not.toBeInTheDocument();
});

test('renders component as a children of legend socket', () => {
  const legend = () => <div data-testid="legend" />;
  const {
    wrapper: { getByTestId },
  } = render({ legend });

  const legendSocket = getByTestId('legend-socket');

  expect(legendSocket).toContainElement(getByTestId('legend'));
});

test('renders tags for widget', () => {
  const tags = [
    {
      label: 'Saved query',
      variant: 'gray',
    },
  ];

  const title = () => <WidgetHeading tags={tags} />;

  const {
    wrapper: { getByTestId, getByText },
  } = render({ title });

  const TagsContainer = getByTestId('widget-tags');
  expect(TagsContainer).toContainElement(getByText('Saved query'));
});

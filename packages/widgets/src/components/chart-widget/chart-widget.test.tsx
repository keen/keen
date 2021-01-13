import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import ChartWidget from './chart-widget.component';

const render = (overProps: any = {}) => {
  const props = {
    title: () => null,
    legend: () => null,
    content: () => null,
    cardSettings: {},
    legendSettings: {},
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

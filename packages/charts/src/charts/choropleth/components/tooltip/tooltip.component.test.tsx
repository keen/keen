import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import Tooltip from './tooltip.component';

import { theme } from '../../../../theme';

const render = (overProps: Partial<ComponentProps<typeof Tooltip>> = {}) => {
  const { labels, values } = theme.tooltip;
  const props = {
    geographicalName: 'United States',
    totalValue: 1000,
    theme: {
      labels,
      values,
    },
    ...overProps,
  };

  const wrapper = rtlRender(<Tooltip {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders geographical area name', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(props.geographicalName);

  expect(element).toBeInTheDocument();
});

test('renders total value', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(`${props.totalValue}`);

  expect(element).toBeInTheDocument();
});

test('applies pattern formatter for total value', () => {
  const {
    wrapper: { getByText },
  } = render({
    formatValue: '${number; 0.00}£',
  });
  const element = getByText('1000.00£');

  expect(element).toBeInTheDocument();
});

test('applies function formatter for total value', () => {
  const {
    wrapper: { getByText },
    props,
  } = render({
    formatValue: jest.fn().mockImplementation((value) => `${value}$`),
  });
  const element = getByText('1000$');

  expect(props.formatValue).toHaveBeenCalled();
  expect(element).toBeInTheDocument();
});

test('renders partial values for geographical area', () => {
  const partialValues = {
    Books: 400,
    Cars: 600,
  };

  const {
    wrapper: { getByText },
  } = render({ partialValues });

  const element = getByText('Books');
  const percentValue = getByText('(40%)');

  expect(element).toBeInTheDocument();
  expect(percentValue).toBeInTheDocument();
});

test('applies pattern formatter for partial values', () => {
  const partialValues = {
    Books: 400,
    Cars: 600,
  };
  const {
    wrapper: { getByText },
  } = render({
    partialValues,
    formatValue: '${number; 0.00}£',
  });

  const element = getByText('600.00£');

  expect(element).toBeInTheDocument();
});

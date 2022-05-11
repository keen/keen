import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Layout } from '@keen.io/ui-core';

import FunnelChart from './funnel-chart.component';
import { chartData } from './funnel-chart.fixtures';

import { theme } from '../../theme';

jest.mock('../../components/responsive-wrapper.component', () => {
  const Component = ({ children }) => <>{children()}</>;
  return Component;
});

const render = (
  overProps: Partial<ComponentProps<typeof FunnelChart>> = {}
) => {
  const props = {
    theme,
    data: chartData,
    labelSelector: 'name',
    valueKey: 'value',
    stepLabels: ['E-mails'],
    layout: 'vertical' as Layout,
    margins: { top: 50, right: 20, bottom: 50, left: 40 },
    ...overProps,
  };

  const wrapper = rtlRender(<FunnelChart {...props} />);

  return {
    props,
    wrapper,
  };
};

test('renders step labels based on provided configuration', () => {
  const {
    wrapper: { getByText },
  } = render();
  const element = getByText('E-mails');

  expect(element).toBeInTheDocument();
});

test('renders correct amount of steps based on provided data', () => {
  const {
    wrapper: { getAllByTestId },
    props,
  } = render();
  const steps = getAllByTestId('funnel-step');

  expect(steps.length).toEqual(props.data.length);
});

test('renders values without formatting', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  props.data.forEach((item) =>
    expect(getByText(`${item.value}`)).toBeInTheDocument()
  );
});

test('renders correct value after string formatter', () => {
  const {
    wrapper: { getByText },
  } = render({
    formatValues: '${number; 0.00a}',
  });
  expect(getByText('1.00k')).toBeInTheDocument();
  expect(getByText('500.00')).toBeInTheDocument();
  expect(getByText('250.00')).toBeInTheDocument();
});

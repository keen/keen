import React, { ComponentProps } from 'react';
import { render as rtlRender, waitFor } from '@testing-library/react';
import { scaleLinear } from 'd3-scale';
import { colors } from '@keen.io/colors';
import { Layout } from '@keen.io/ui-core';

import Step from './step.component';

import { theme } from '../../../../theme';

jest.mock('../../../../components/responsive-wrapper.component', () => {
  const Component = ({ children }) => <>{children()}</>;
  return Component;
});

const render = (overProps: Partial<ComponentProps<typeof Step>> = {}) => {
  const props = {
    theme,
    index: 0,
    layout: 'vertical' as Layout,
    label: 'Logins',
    value: 50,
    nextPercentageValue: 30,
    percentageValue: 40,
    color: colors.blue[100],
    margins: { top: 50, right: 20, bottom: 50, left: 40 },
    stepsCount: 3,
    scale: scaleLinear().domain([0, 100]),
    ...overProps,
  };

  const wrapper = rtlRender(<Step {...props} />);

  return {
    props,
    wrapper,
  };
};

test('renders <svg /> element with <path/> element as content', async () => {
  const {
    wrapper: { container },
  } = render();

  await waitFor(() => {
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('path')).toBeInTheDocument();
  });
});

test('renders "label" component', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  expect(getByText(props.label)).toBeInTheDocument();
});

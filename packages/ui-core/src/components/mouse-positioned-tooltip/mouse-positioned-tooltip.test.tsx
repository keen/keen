import React from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import MousePositionedTooltip from './mouse-positioned-tooltip';

const render = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };

  const wrapper = rtlRender(<MousePositionedTooltip {...props} />);
  return {
    wrapper,
    props,
  };
};

test('renders provided children', () => {
  const children = 'text';
  const {
    wrapper: { getByText },
  } = render({ children });

  expect(getByText(children)).toBeInTheDocument();
});

test('shows tooltip when is active', async () => {
  const children = 'text';
  const {
    wrapper: { getByText, queryByTestId },
  } = render({
    children,
    renderContent: () => 'Tooltip content',
    isActive: true,
  });

  const renderedChildren = getByText(children);
  fireEvent.mouseOver(renderedChildren);

  const tooltip = await queryByTestId('dynamic-portal');

  expect(tooltip).toBeInTheDocument();
});

test('does not show tooltip when is not active', async () => {
  const children = 'text';
  const {
    wrapper: { getByText, queryByTestId },
  } = render({
    children,
    renderContent: () => 'Tooltip content',
    isActive: false,
  });

  const renderedChildren = getByText(children);
  fireEvent.mouseOver(renderedChildren);

  const tooltip = await queryByTestId('dynamic-portal');

  expect(tooltip).not.toBeInTheDocument();
});

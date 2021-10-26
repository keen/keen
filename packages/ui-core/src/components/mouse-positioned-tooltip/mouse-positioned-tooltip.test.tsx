import React from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import MousePositionedTooltip from './mouse-positioned-tooltip';
import { KEYBOARD_KEYS } from '../../constants';

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

test('does not show tooltip by key press when tooltip is not active', async () => {
  const children = 'text';
  const {
    wrapper: { getByText, queryByTestId },
  } = render({
    children,
    renderContent: () => 'Tooltip content',
    isActive: false,
  });

  const renderedChildren = getByText(children);
  fireEvent.keyDown(renderedChildren, { key: 'Enter', keyCode: 13 });

  const tooltip = await queryByTestId('dynamic-portal');

  expect(tooltip).not.toBeInTheDocument();
});

test('shows tooltip by key press when tooltip is active', async () => {
  const children = 'text';
  const {
    wrapper: { getByText, queryByTestId },
  } = render({
    children,
    renderContent: () => 'Tooltip content',
    isActive: true,
  });

  const renderedChildren = getByText(children);
  fireEvent.keyDown(renderedChildren, { key: 'Enter', keyCode: 13 });

  const tooltip = await queryByTestId('dynamic-portal');

  expect(tooltip).toBeInTheDocument();
});

test('hides tooltip on ESC key press when tooltip is active', async () => {
  const children = 'text';
  const {
    wrapper: { getByText, queryByTestId },
  } = render({
    children,
    renderContent: () => 'Tooltip content',
    isActive: true,
  });

  const renderedChildren = getByText(children);
  fireEvent.keyDown(renderedChildren, {
    key: 'Enter',
    keyCode: KEYBOARD_KEYS.ENTER,
  });

  const tooltip = await queryByTestId('dynamic-portal');

  fireEvent.keyDown(renderedChildren, {
    key: 'Escape',
    keyCode: KEYBOARD_KEYS.ESCAPE,
  });

  expect(tooltip).not.toBeInTheDocument();
});

test('calls "onHideTooltip" handler when tooltip visibility change', async () => {
  const children = 'text';
  const {
    props,
    wrapper: { getByText },
  } = render({
    children,
    renderContent: () => 'Tooltip content',
    onHideTooltip: jest.fn(),
    isActive: true,
  });

  const renderedChildren = getByText(children);
  fireEvent.mouseOver(renderedChildren);

  fireEvent.keyDown(renderedChildren, {
    key: 'Escape',
    keyCode: KEYBOARD_KEYS.ESCAPE,
  });

  expect(props.onHideTooltip).toHaveBeenCalled();
});

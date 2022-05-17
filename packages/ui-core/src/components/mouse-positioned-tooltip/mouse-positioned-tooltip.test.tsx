import React, { ComponentProps } from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import MousePositionedTooltip from './mouse-positioned-tooltip';
import { KEYBOARD_KEYS } from '../../constants';

const render = (
  overProps: Partial<ComponentProps<typeof MousePositionedTooltip>> = {}
) => {
  const props = {
    children: 'text',
    isActive: false,
    renderContent: () => 'Tooltip content',
    ...overProps,
  };

  const wrapper = rtlRender(<MousePositionedTooltip {...props} />);
  return {
    wrapper,
    props,
  };
};

test('renders provided children', () => {
  const {
    wrapper: { getByText },
    props: { children },
  } = render();

  expect(getByText(children.toString())).toBeInTheDocument();
});

test('shows tooltip when is active', async () => {
  const {
    wrapper: { getByText, queryByTestId },
    props: { children },
  } = render({
    isActive: true,
  });

  const renderedChildren = getByText(children.toString());
  fireEvent.mouseOver(renderedChildren);

  const tooltip = await queryByTestId('dynamic-portal');

  expect(tooltip).toBeInTheDocument();
});

test('does not show tooltip when is not active', async () => {
  const {
    wrapper: { getByText, queryByTestId },
    props: { children },
  } = render({
    isActive: false,
  });

  const renderedChildren = getByText(children.toString());
  fireEvent.mouseOver(renderedChildren);

  const tooltip = await queryByTestId('dynamic-portal');

  expect(tooltip).not.toBeInTheDocument();
});

test('does not show tooltip by key press when tooltip is not active', async () => {
  const {
    wrapper: { getByText, queryByTestId },
    props: { children },
  } = render({
    isActive: false,
  });

  const renderedChildren = getByText(children.toString());
  fireEvent.keyDown(renderedChildren, { key: 'Enter', keyCode: 13 });

  const tooltip = await queryByTestId('dynamic-portal');

  expect(tooltip).not.toBeInTheDocument();
});

test('shows tooltip by key press when tooltip is active', async () => {
  const {
    wrapper: { getByText, queryByTestId },
    props: { children },
  } = render({
    isActive: true,
  });

  const renderedChildren = getByText(children.toString());
  fireEvent.keyDown(renderedChildren, { key: 'Enter', keyCode: 13 });

  const tooltip = await queryByTestId('dynamic-portal');

  expect(tooltip).toBeInTheDocument();
});

test('hides tooltip on ESC key press when tooltip is active', async () => {
  const {
    wrapper: { getByText, queryByTestId },
    props: { children },
  } = render({
    isActive: true,
  });

  const renderedChildren = getByText(children.toString());
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
  const {
    props: { children, onHideTooltip },
    wrapper: { getByText },
  } = render({
    onHideTooltip: jest.fn(),
    isActive: true,
  });

  const renderedChildren = getByText(children.toString());
  fireEvent.mouseOver(renderedChildren);

  fireEvent.keyDown(renderedChildren, {
    key: 'Escape',
    keyCode: KEYBOARD_KEYS.ESCAPE,
  });

  expect(onHideTooltip).toHaveBeenCalled();
});

import React, { ComponentProps } from 'react';
import {
  render as rtlRender,
  fireEvent,
  getNodeText,
} from '@testing-library/react';
import 'jest-styled-components';

import ActionButton from './action-button.component';
import { ButtonAction } from './types';

const render = (
  overProps: Partial<ComponentProps<typeof ActionButton>> = {}
) => {
  const props = {
    action: 'create' as ButtonAction,
    ...overProps,
  };
  const wrapper = rtlRender(<ActionButton {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('@keen.io/ui-core - <ActionButton />', () => {
  test('should render action button component', () => {
    const {
      wrapper: { getByTestId },
    } = render();
    const element = getByTestId('action-button');

    expect(element).toBeInTheDocument();
  });

  test('should call onClick callback', () => {
    const mockFn = jest.fn();
    const {
      wrapper: { getByTestId },
    } = render({ onClick: mockFn });
    const element = getByTestId('action-button');
    fireEvent.click(element);

    expect(mockFn).toHaveBeenCalled();
  });

  test('should not call onClick callback once button is disabled', () => {
    const mockFn = jest.fn();
    const {
      wrapper: { getByTestId },
    } = render({ onClick: mockFn, isDisabled: true });
    const element = getByTestId('action-button');
    fireEvent.click(element);

    expect(mockFn).not.toHaveBeenCalled();
  });

  test('should render create button icon', () => {
    const {
      wrapper: { getByTestId },
    } = render();
    const element = getByTestId('action-icon');
    const nodeText = getNodeText(element);

    expect(nodeText).toEqual('+');
  });

  test('should render remove button icon', () => {
    const {
      wrapper: { getByTestId },
    } = render({ action: 'remove' });
    const element = getByTestId('action-icon');
    const nodeText = getNodeText(element);

    expect(nodeText).toEqual('×');
  });

  test('should render custom border radius', () => {
    const {
      wrapper: { getByTestId },
    } = render({ borderRadius: '0' });
    const element = getByTestId('action-button');

    expect(element).toMatchSnapshot();
  });

  test('should not render background', () => {
    const {
      wrapper: { getByTestId },
    } = render({ background: 'red' });
    const element = getByTestId('action-icon');

    expect(element).toMatchSnapshot();
  });

  test('should add custom class', () => {
    const { container } = rtlRender(
      <ActionButton className="custom-button" action="create" />
    );
    const element = container.querySelector('.custom-button');

    expect(element).toBeInTheDocument();
  });
});

import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  getNodeText,
} from '@testing-library/react';
import 'jest-styled-components';

import ActionButton from './action-button.component';

const render = (props: any = {}) => {
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
    } = render({ action: 'create' });
    const element = getByTestId('action-button');

    expect(element).toBeInTheDocument();
  });

  test('should call onClick callback', () => {
    const mockFn = jest.fn();
    const {
      wrapper: { getByTestId },
    } = render({ action: 'create', onClick: mockFn });
    const element = getByTestId('action-button');
    fireEvent.click(element);

    expect(mockFn).toHaveBeenCalled();
  });

  test('should not call onClick callback once button is disabled', () => {
    const mockFn = jest.fn();
    const {
      wrapper: { getByTestId },
    } = render({ action: 'create', onClick: mockFn, isDisabled: true });
    const element = getByTestId('action-button');
    fireEvent.click(element);

    expect(mockFn).not.toHaveBeenCalled();
  });

  test('should render create button icon', () => {
    const {
      wrapper: { getByTestId },
    } = render({ action: 'create' });
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
});

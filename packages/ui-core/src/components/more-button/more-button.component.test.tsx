import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import MoreButton from './more-button.component';

const render = (overProps: any = {}) => {
  const props = {
    htmlType: 'button',
    ...overProps,
  };

  const wrapper = rtlRender(<MoreButton {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('@keen.io/ui-core - <MoreButton />', () => {
  test('should render more button component', () => {
    const {
      wrapper: { getByTestId },
    } = render();
    const element = getByTestId('more-button');

    expect(element).toBeInTheDocument();
  });

  test('should call onClick callback', () => {
    const mockFn = jest.fn();
    const {
      wrapper: { getByTestId },
    } = render({ onClick: mockFn });
    const element = getByTestId('more-button');
    fireEvent.click(element);

    expect(mockFn).toHaveBeenCalled();
  });

  test('should not call onClick callback once button is disabled', () => {
    const mockFn = jest.fn();
    const {
      wrapper: { getByTestId },
    } = render({ onClick: mockFn, isDisabled: true });
    const element = getByTestId('more-button');
    fireEvent.click(element);

    expect(mockFn).not.toHaveBeenCalled();
  });
});

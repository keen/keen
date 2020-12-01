import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import CircleButton from './circle-button.component';

const render = (props: any = {}) => {
  const wrapper = rtlRender(<CircleButton {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('@keen.io/ui-core - <CircleButton />', () => {
  test('should render CircleButton component', () => {
    const {
      wrapper: { getByTestId },
    } = render();
    const element = getByTestId('circle-button');

    expect(element).toBeInTheDocument();
  });

  test('should render CircleButton with icon', () => {
    const {
      wrapper: { getByText },
    } = render({
      icon: <i>icon</i>,
    });

    expect(getByText('icon')).toBeInTheDocument();
  });

  test('should render CircleButton secondary variant', () => {
    const {
      wrapper: { getByTestId },
    } = render({ variant: 'secondary' });
    const element = getByTestId('circle-button');

    expect(element).toMatchSnapshot();
  });

  test('should call onClick callback', () => {
    const mockFn = jest.fn();
    const {
      wrapper: { getByTestId },
    } = render({ onClick: mockFn });
    const element = getByTestId('circle-button');
    fireEvent.click(element);

    expect(mockFn).toHaveBeenCalled();
  });

  test('should not call onClick callback once button is disabled', () => {
    const mockFn = jest.fn();
    const {
      wrapper: { getByTestId },
    } = render({ onClick: mockFn, isDisabled: true });
    const element = getByTestId('circle-button');
    fireEvent.click(element);

    expect(mockFn).not.toHaveBeenCalled();
  });
});

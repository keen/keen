/* eslint-disable react/display-name */
import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';
import RefText from './ref-text.component';
import { Typography } from '../types';

const render = (overProps: Partial<ComponentProps<typeof RefText>> = {}) => {
  const typography: Typography = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    fontColor: 'black',
  };
  const props = {
    children: 'text',
    ref: () => <div />,
    ...typography,
    ...overProps,
  };

  const wrapper = rtlRender(<RefText {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render provided text', () => {
  const {
    wrapper: { getByText },
    props: { children },
  } = render();

  expect(getByText(children)).toBeInTheDocument();
});

test('should get ref', () => {
  const ref = jest.fn();
  render({
    ref,
    truncate: true,
  });
  expect(ref).toHaveBeenCalled();
});

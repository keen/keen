/* eslint-disable react/no-children-prop */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import ColorAdjuster from './color-adjuster.component';

const render = (overProps: any = {}) => {
  const props = {
    baseColor: '#fff',
    ...overProps,
  } as any;

  const wrapper = rtlRender(<ColorAdjuster {...props} />);

  return {
    wrapper,
    props,
  };
};

let mockFn: any;

beforeEach(() => {
  mockFn = jest.fn().mockImplementation(() => <div />);
});

test('should adjust color for light base', () => {
  render({ children: mockFn });

  const callArguments = mockFn.mock.calls[0][0];

  expect(callArguments).toMatchInlineSnapshot(`"hsl(0, 0%, 20%)"`);
  expect(mockFn).toHaveBeenCalled();
});

test('should adjust color for dark base', () => {
  const baseColor = '#000';
  render({ baseColor, children: mockFn });

  const callArguments = mockFn.mock.calls[0][0];

  expect(callArguments).toMatchInlineSnapshot(`"hsl(0, 0%, 80%)"`);
  expect(mockFn).toHaveBeenCalled();
});

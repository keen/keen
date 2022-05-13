import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import RulerLabel from './ruler-label.component';
import { fitText } from './utils';

import { Orientation } from '../../types';

jest.mock('./utils', () => {
  return {
    fitText: jest.fn(),
  };
});

const render = (overProps: Partial<ComponentProps<typeof RulerLabel>> = {}) => {
  const props = {
    dx: 0,
    dy: 0,
    orientation: Orientation.VERTICAL,
    maxDimension: null,
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <RulerLabel {...props}>label</RulerLabel>
    </svg>
  );

  return {
    props,
    wrapper,
  };
};

beforeEach(() => {
  fitText.mockClear();
});

test('renders label text', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText('label')).toBeInTheDocument();
});

test('fit label based on specified dimension', () => {
  fitText.mockImplementationOnce(() => ({ isTruncated: false }));
  render({
    maxDimension: 100,
  });

  expect(fitText).toHaveBeenCalled();
});

test('truncates label and renders title with full text', () => {
  fitText.mockImplementationOnce(() => ({ isTruncated: true }));
  const {
    wrapper: { getByTestId },
  } = render({
    maxDimension: 100,
  });

  expect(getByTestId('ruler-label-title')).toBeInTheDocument();
});

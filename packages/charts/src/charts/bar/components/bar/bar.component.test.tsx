/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { colors } from '@keen.io/colors';
import { Layout } from '@keen.io/ui-core';
import { useAnimation } from 'framer-motion';
import 'jest-styled-components';

const mockFn = jest.fn();

jest.mock('framer-motion', () => {
  const module = jest.requireActual('framer-motion');

  return {
    ...module,
    motion: {
      ...module.motion,
      rect: forwardRef(
        (
          { children, ...rest }: Record<string, any>,
          ref: React.LegacyRef<HTMLDivElement>
        ) => {
          const { style, height, width } = rest;

          return (
            <rect
              data-testid="bar"
              style={style}
              height={height}
              width={width}
              ref={ref}
            >
              {children}
            </rect>
          );
        }
      ),
    },

    useAnimation: () => ({
      start: mockFn,
    }),
  };
});

import { GroupMode } from '../../../../types';

import Bar from './bar.component';

const render = (overProps: Record<string, any> = {}) => {
  const props = {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    color: '#ccc',
    layout: 'horizontal' as Layout,
    groupMode: 'grouped' as GroupMode,
    colorOutOfRange: false,
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <Bar {...props} />
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

beforeEach(() => {
  mockFn.mockReset();
});

test('set bar element color', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();
  const element = getByTestId('bar');

  expect(element).toHaveStyle({ fill: props.color });
});

test('set bar "width" property', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();
  const element = getByTestId('bar');

  expect(element).toHaveAttribute('width', `${props.width}`);
});

test('set bar "height" property', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();
  const element = getByTestId('bar');

  expect(element).toHaveAttribute('height', `${props.height}`);
});

test('set correct "fill" property for active bar with out of range color', () => {
  const controls = useAnimation();
  render({ isActive: true, colorOutOfRange: true });

  expect(controls.start).toHaveBeenCalledWith(
    expect.objectContaining({
      opacity: 1,
      fill: colors.gray[500],
    })
  );
});

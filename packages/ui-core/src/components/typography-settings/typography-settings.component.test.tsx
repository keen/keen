import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import TypographySettings, { FontSettings } from '../typography-settings';

const initialSettings = {
  color: 'green',
  size: 12,
  bold: true,
  italic: false,
  underline: true,
  alignment: 'left',
} as FontSettings;

const render = (overProps: any = {}) => {
  const props = {
    settings: initialSettings,
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<TypographySettings {...props} />);

  return {
    props,
    wrapper,
  };
};

test.each([
  { availableSettings: { color: false }, testIdSelector: 'color-selector' },
  {
    availableSettings: { fontSize: false },
    testIdSelector: 'font-size-header',
  },
  {
    availableSettings: { alignment: false },
    testIdSelector: 'text-alignment-header',
  },
  { availableSettings: { bold: false }, testIdSelector: 'bold-font-style' },
  { availableSettings: { italic: false }, testIdSelector: 'italic-font-style' },
  {
    availableSettings: { underline: false },
    testIdSelector: 'underline-font-style',
  },
])(
  'should not show disabled options',
  ({ availableSettings, testIdSelector }) => {
    const {
      wrapper: { queryByTestId },
    } = render({
      availableSettings,
    });

    expect(queryByTestId(testIdSelector)).not.toBeInTheDocument();
  }
);

test.each([
  { availableSettings: { color: true }, testIdSelector: 'color-selector' },
  {
    availableSettings: { fontSize: true },
    testIdSelector: 'font-size-header',
  },
  {
    availableSettings: { alignment: true },
    testIdSelector: 'text-alignment-header',
  },
  { availableSettings: { bold: true }, testIdSelector: 'bold-font-style' },
  { availableSettings: { italic: true }, testIdSelector: 'italic-font-style' },
  {
    availableSettings: { underline: true },
    testIdSelector: 'underline-font-style',
  },
])(
  'should show all enabled options',
  ({ availableSettings, testIdSelector }) => {
    const {
      wrapper: { queryByTestId },
    } = render({
      availableSettings,
    });

    expect(queryByTestId(testIdSelector)).toBeInTheDocument();
  }
);

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

test('should not show disabled options', () => {
  const {
    wrapper: { queryByTestId, queryAllByTestId },
  } = render({
    availableSettings: {
      color: false,
      fontSize: false,
      fontStyle: false,
      alignment: false,
    },
  });

  const colorSelector = queryByTestId('color-selector');
  const fontSize = queryByTestId('font-size-header');
  const textAlignment = queryByTestId('text-alignment-header');
  const fontStyle = queryAllByTestId('font-style');

  expect(colorSelector).not.toBeInTheDocument();
  expect(fontSize).not.toBeInTheDocument();
  expect(textAlignment).not.toBeInTheDocument();
  expect(fontStyle).toHaveLength(0);
});

test('should show all enabled options', () => {
  const {
    wrapper: { queryByTestId, queryAllByTestId },
  } = render({
    availableSettings: {
      color: true,
      fontSize: true,
      alignment: true,
      fontStyle: true,
    },
  });

  const colorSelector = queryByTestId('color-selector');
  const fontSize = queryByTestId('font-size-header');
  const textAlignment = queryByTestId('text-alignment-header');
  const fontStyle = queryAllByTestId('font-style');

  expect(colorSelector).toBeInTheDocument();
  expect(fontSize).toBeInTheDocument();
  expect(textAlignment).toBeInTheDocument();
  expect(fontStyle).toHaveLength(3);
});

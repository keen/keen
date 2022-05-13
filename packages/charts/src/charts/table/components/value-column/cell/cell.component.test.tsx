import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Cell as CellType } from 'react-table';
import 'jest-styled-components';

import { Cell } from './cell.component';
import { Typography } from '@keen.io/ui-core';

const render = (overProps: Partial<ComponentProps<typeof Cell>> = {}) => {
  const props = {
    cell: {
      getCellProps: () => ({
        key: '@key',
      }),
      value: {
        formatterType: null,
        value: '@value',
      },
    } as CellType,
    isActive: false,
    onCellClick: jest.fn(),
    onCellMouseEnter: jest.fn(),
    onCellMouseLeave: jest.fn(),
    typography: {
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontColor: 'black',
    } as Typography,
    ...overProps,
  };

  const wrapper = rtlRender(
    <table>
      <tbody>
        <tr>
          <Cell {...props} />
        </tr>
      </tbody>
    </table>
  );

  return {
    wrapper,
    props,
  };
};

test('renders cell value', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const { value } = props.cell.value;

  expect(getByText(value)).toBeInTheDocument();
});

test('set content width based on property value', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({
    width: 100,
  });

  const element = getByTestId('table-cell-content');

  expect(element).toHaveStyleRule('width', `${props.width}px`);
});

test('applies "typography" settings', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const { value } = props.cell.value;

  const element = getByText(value);

  expect(element).toHaveStyleRule(
    'font-size',
    `${props.typography.fontSize}px`
  );
  expect(element).toHaveStyleRule('font-style', props.typography.fontStyle);
});

test('renders cell value', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const { value } = props.cell.value;

  expect(getByText(value)).toBeInTheDocument();
});

test('calls "onCellClick" event handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const element = getByTestId('table-value-cell');
  fireEvent.click(element);

  expect(props.onCellClick).toHaveBeenCalled();
});

test('calls "onCellMouseEnter" event handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const element = getByTestId('table-value-cell');
  fireEvent.mouseEnter(element);

  expect(props.onCellMouseEnter).toHaveBeenCalled();
});

test('calls "onCellMouseLeave" event handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const element = getByTestId('table-value-cell');
  fireEvent.mouseLeave(element);

  expect(props.onCellMouseLeave).toHaveBeenCalled();
});

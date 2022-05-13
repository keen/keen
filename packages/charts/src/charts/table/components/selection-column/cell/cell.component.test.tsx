import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Cell as CellType } from 'react-table';
import 'jest-styled-components';

import { Cell, EnhancedRow } from './cell.component';

const render = (overProps: Partial<ComponentProps<typeof Cell>> = {}) => {
  const props = {
    cell: {
      getCellProps: () => ({
        key: '@key',
      }),
    } as CellType,
    row: {
      getToggleRowSelectedProps: () => ({
        checked: false,
      }),
    } as EnhancedRow,
    editMode: false,
    onCellClick: jest.fn(),
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

test('calls "onCellClick" event handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const element = getByTestId('table-selection-column-cell');
  fireEvent.click(element);

  expect(props.onCellClick).toHaveBeenCalled();
});

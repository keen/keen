import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Cell } from './cell.component';

const render = (overProps: any = {}) => {
  const props = {
    cell: {
      getCellProps: () => ({
        key: '@key',
      }),
    },
    row: {
      getToggleRowSelectedProps: () => ({
        checked: false,
      }),
    },
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

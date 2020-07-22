import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TableRow from './table-row.component';

const render = (overProps: any = {}) => {
  const props = {
    ...overProps,
    onCellClick: jest.fn(),
    backgroundColor: 'black',
    isColumnDragged: false,
    typography: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      fontFamily: 'Lato Regular, sans-serif',
      fontColor: 'black',
      lineHeight: '17px',
    } as any,
    data: {
      price: 'Price',
      name: 'Name',
    },
  };

  const wrapper = rtlRender(
    <table>
      <tbody>
        <TableRow {...props} />
      </tbody>
    </table>
  );

  return {
    wrapper,
    props,
  };
};

test('renders cell elements', async () => {
  const {
    wrapper: { findAllByTestId },
  } = render();
  const cells = await findAllByTestId('table-cell');

  expect(cells.length).toEqual(2);
});

test('calls "onCellClick" handler', () => {
  const {
    wrapper: { getByText },
    props: { onCellClick },
  } = render();
  const element = getByText('Price');
  fireEvent.click(element);

  expect(onCellClick).toHaveBeenCalled();
});

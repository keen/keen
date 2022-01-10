import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TableFooter from './table-footer.component';

const render = (overProps: any = {}) => {
  const props = {
    rows: 15,
    totalPages: 150,
    onPageChange: jest.fn(),
    onItemsPerPageChange: jest.fn(),
    pagination: true,
    ...overProps,
  };

  const wrapper = rtlRender(<TableFooter {...props} />);

  return {
    props,
    wrapper,
  };
};

test('should render number of rows', () => {
  const {
    wrapper: { getByText },
    props: { rows },
  } = render();

  const element = getByText(`${rows} rows`);
  expect(element).toBeInTheDocument();
});

test('should call onPageChange', () => {
  const {
    wrapper: { getByText },
    props: { onPageChange },
  } = render();

  const element = getByText('4');
  fireEvent.click(element);

  expect(onPageChange).toHaveBeenCalledWith(4);
});

test('should call onItemsPerPageChange', () => {
  const {
    wrapper: { getByText },
    props: { onItemsPerPageChange },
  } = render();

  const element = getByText('15 per page');
  fireEvent.click(element);

  const chosenElement = getByText('50 per page');
  fireEvent.click(chosenElement);

  expect(onItemsPerPageChange).toHaveBeenCalledWith(50);
});

test('should not show pagination and rows per page selector when pagination is disabled', () => {
  const {
    wrapper: { queryByTestId },
  } = render({
    pagination: false,
  });

  const pagination = queryByTestId('pagination');
  const rowsPerPageSelector = queryByTestId('rows-per-page');

  expect(pagination).toBeNull();
  expect(rowsPerPageSelector).toBeNull();
});

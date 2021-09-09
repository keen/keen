import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TableHeader from './table-header.component';

const render = (overProps: any = {}) => {
  const props = {
    backgroundColor: 'navyblue',
    propertyName: 'price',
    children: 'Price',
    isColumnDragged: false,
    ...overProps,
  };

  const wrapper = rtlRender(<TableHeader {...props} />);

  return {
    wrapper,
    props,
  };
};

test('shows the table column name', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(props.children);

  expect(element).toBeInTheDocument();
});

test('allows user to sort column data', () => {
  const mockFn = jest.fn();
  const {
    wrapper: { getByText },
    props: { propertyName, children },
  } = render({ onSort: mockFn });

  const element = getByText(children);
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith({ propertyName, sortMode: 'ascending' });
});

test('allows user to change sort direction properties', () => {
  const mockFn = jest.fn();
  const sortOptions = {
    property: 'price',
    sort: 'ascending',
  };

  const {
    wrapper: { getByText },
    props: { propertyName, children },
  } = render({ sortOptions, onSort: mockFn });

  const element = getByText(children);
  fireEvent.click(element);
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith({ propertyName, sortMode: 'descending' });
});

test('shows column sort indicators', () => {
  const mockFn = jest.fn();
  const sortOptions = {
    property: 'price',
    sort: 'ascending',
  };

  const {
    wrapper: { getByTestId },
  } = render({ sortOptions, onSort: mockFn });
  const element = getByTestId('sort-indicators');

  expect(element).toBeInTheDocument();
});

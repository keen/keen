import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { colors } from '@keen.io/colors';
import 'jest-styled-components';

import HeaderRow from './header-row.component';

const render = (overProps: any = {}) => {
  const props = {
    ...overProps,
    data: [
      { key: 'id', value: 'id' },
      { key: 'title', value: 'title' },
    ],
    color: colors.blue[300],
    sortOptions: null,
    onSort: jest.fn(),
    typography: {
      fontSize: 20,
      fontWeight: 'normal',
    },
    isColumnDragged: false,
  };

  const wrapper = rtlRender(
    <table>
      <HeaderRow {...props} />
    </table>
  );

  return {
    props,
    wrapper,
  };
};

test('renders columns according to provided data', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText('id')).toBeInTheDocument();
  expect(getByText('title')).toBeInTheDocument();
});

test('allows user to sort data', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const element = getByText('id');
  fireEvent.click(element);

  expect(props.onSort).toHaveBeenCalledWith({
    propertyName: 'id',
    sortMode: 'ascending',
  });
});

test('applies typography settings to table header', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();
  const headerElement = getByTestId('header-row-container');

  expect(headerElement).toHaveStyle(props.typography);
});

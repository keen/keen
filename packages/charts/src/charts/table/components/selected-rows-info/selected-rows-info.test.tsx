import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { SelectedRowsInfo } from './selected-rows-info';

const render = (
  overProps: Partial<ComponentProps<typeof SelectedRowsInfo>> = {}
) => {
  const props = {
    selectedRowsNumber: 2,
    onClearRowsSelection: jest.fn(),
    onCopySelectedRows: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<SelectedRowsInfo {...props} />);

  return {
    wrapper,
    props,
  };
};

test('shows selected rows number info', () => {
  const {
    wrapper: { getByText },
  } = render();

  const rowsSelectedNumberInfo = getByText('2 rows selected');

  expect(rowsSelectedNumberInfo).toBeInTheDocument();
});

test('calls "onClearRowsSelection" handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const button = getByTestId('clear-selection-btn');
  fireEvent.click(button);

  expect(props.onClearRowsSelection).toHaveBeenCalled();
});

test('calls "onCopySelectedRows" handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const button = getByTestId('copy-selection-btn');
  fireEvent.click(button);

  expect(props.onCopySelectedRows).toHaveBeenCalled();
});

import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Pagination from './pagination.component';

const render = (overProps: any = {}) => {
  const props = {
    onChange: jest.fn(),
    totalPages: 10,
    ...overProps,
  };

  const wrapper = rtlRender(<Pagination {...props} />);

  return {
    props,
    wrapper,
  };
};

test('should not call onChange when the user clicks on the current page', () => {
  const {
    wrapper: { getByText },
    props: { onChange },
  } = render();

  const firstPage = getByText('1');
  fireEvent.click(firstPage);

  expect(onChange).not.toHaveBeenCalled();
});

test('should call onChange when clicking on the page other than current', () => {
  const {
    wrapper: { getByText },
    props: { onChange },
  } = render();

  const pageNumber = 2;
  const page = getByText(`${pageNumber}`);

  fireEvent.click(page);

  expect(onChange).toHaveBeenCalledWith(pageNumber);
});

test('should call onChange when clicking previous arrow', () => {
  const pageNumber = 2;
  const {
    wrapper: { getByTestId },
    props: { onChange },
  } = render({ page: pageNumber });

  const arrow = getByTestId('prev-btn');

  fireEvent.click(arrow);

  expect(onChange).toHaveBeenCalled();
});

test('should call onChange when clicking next arrow', () => {
  const pageNumber = 2;
  const {
    wrapper: { getByTestId },
    props: { onChange },
  } = render({ page: pageNumber });

  const arrow = getByTestId('next-btn');

  fireEvent.click(arrow);

  expect(onChange).toHaveBeenCalled();
});

test('should not call onChange when the user is on the first page and tries to click prev arrow', () => {
  const {
    wrapper: { getByTestId },
    props: { onChange },
  } = render();

  const arrow = getByTestId('prev-btn');

  fireEvent.click(arrow);

  expect(onChange).not.toHaveBeenCalled();
});

test('should not call onChange when the user is on the last page and tries to click next arrow', () => {
  const {
    wrapper: { getByTestId },
    props: { onChange },
  } = render({ page: 10 });

  const arrow = getByTestId('next-btn');

  fireEvent.click(arrow);

  expect(onChange).not.toHaveBeenCalled();
});

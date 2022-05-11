import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TableCell from './table-cell.component';
import { Typography } from '../../types';

const render = (overProps: Partial<ComponentProps<typeof TableCell>> = {}) => {
  const props = {
    onClick: jest.fn(),
    value: 'value',
    index: 0,
    disableBorder: false,
    typography: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      fontFamily: 'Lato Regular, sans-serif',
      fontColor: 'black',
      lineHeight: '17px',
    } as Typography,
    ...overProps,
  };

  const wrapper = rtlRender(
    <table>
      <tbody>
        <tr>
          <TableCell {...props} />
        </tr>
      </tbody>
    </table>
  );

  return {
    wrapper,
    props,
  };
};

test('shows the value', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  expect(getByText(props.value)).toBeInTheDocument();
});

test('separates collection of values with comma delimeter', () => {
  const {
    wrapper: { getByText },
  } = render({
    value: ['marketing', 'sales'],
  });

  expect(getByText('marketing, sales')).toBeInTheDocument();
});

test('calls "onClick" handler', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(props.value);

  fireEvent.click(element);

  expect(props.onClick).toHaveBeenCalled();
});

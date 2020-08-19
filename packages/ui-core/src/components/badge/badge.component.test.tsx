/* eslint-disable react/no-children-prop */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Badge from './badge.component';

test('renders children nodes', () => {
  const children = 'Badge';
  const { getByText } = render(<Badge>{children}</Badge>);

  expect(getByText(children)).toBeInTheDocument();
});

test('should call "onClick" handler', () => {
  const children = 'Badge';
  const onClick = jest.fn();
  const { getByTestId } = render(
    <Badge removable onClick={onClick}>
      {children}
    </Badge>
  );

  const element = getByTestId('badge-remove');
  fireEvent.click(element);

  expect(onClick).toHaveBeenCalled();
});

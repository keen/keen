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
  const { getByText } = render(<Badge onClick={onClick}>{children}</Badge>);

  const element = getByText(children);
  fireEvent.click(element);

  expect(onClick).toHaveBeenCalled();
});

test('should call "onRemove" handler', () => {
  const children = 'Badge';
  const onRemove = jest.fn();
  const { getByTestId } = render(
    <Badge removable onRemove={onRemove}>
      {children}
    </Badge>
  );

  const element = getByTestId('badge-remove');
  fireEvent.click(element);

  expect(onRemove).toHaveBeenCalled();
});

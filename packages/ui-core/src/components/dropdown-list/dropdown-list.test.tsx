import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import DropdownList from './dropdown-list.component';

const items = [
  { label: 'Marketing', value: 0 },
  {
    label: 'IT',
    value: 1,
  },
];

test('renders list nodes', () => {
  const { getByText } = render(
    <DropdownList items={items} onClick={jest.fn()} />
  );

  expect(getByText('Marketing')).toBeInTheDocument();
});

test('calls "onClick" handler', () => {
  const mockFn = jest.fn();
  const { getByText } = render(<DropdownList items={items} onClick={mockFn} />);

  const element = getByText('Marketing');
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalled();
});

test('allows to override item renderer', () => {
  const itemRenderer = () => <div>custom item</div>;
  const mockFn = jest.fn();

  const { getByText } = render(
    <DropdownList
      items={[{ label: 'Marketing', value: 0 }]}
      onClick={mockFn}
      renderItem={itemRenderer}
    />
  );

  expect(getByText('custom item')).toBeInTheDocument();
});

import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import SideMenuComponent from './side-menu.component';

const menuItems = [
  {
    id: 'item1',
    label: 'Menu item 1',
  },
  {
    id: 'item2',
    label: 'Menu item 2',
  },
  {
    id: 'item3',
    label: 'Menu item 3',
  },
];

test('renders all menu items', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <SideMenuComponent menuItems={menuItems} onChange={mockFn} />
  );
  menuItems.forEach((item) =>
    expect(getByText(item.label)).toBeInTheDocument()
  );
});

test('allows user to select item', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <SideMenuComponent menuItems={menuItems} onChange={mockFn} />
  );

  const element = getByText(menuItems[1].label);
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith(menuItems[1].id);
});

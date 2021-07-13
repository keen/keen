import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import SideMenuComponent from './side-menu.component';

test('renders all menu items', () => {
  const mockFn = jest.fn();
  const menuItems = ['MenuItem1', 'MenuItem2'];
  const { getByText } = render(
    <SideMenuComponent menuItems={menuItems} onChange={mockFn} />
  );

  menuItems.forEach((item) => expect(getByText(item)).toBeInTheDocument());
});

test('allows user to select item', () => {
  const mockFn = jest.fn();
  const menuItems = ['MenuItem1', 'MenuItem2'];
  const { getByText } = render(
    <SideMenuComponent menuItems={menuItems} onChange={mockFn} />
  );

  const element = getByText(menuItems[1]);
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith(menuItems[1]);
});

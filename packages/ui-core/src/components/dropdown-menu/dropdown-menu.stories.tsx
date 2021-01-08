/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import { DropdownMenu } from './dropdown-menu.component';
import { Item, Header, Divider } from './components';

export default {
  title: 'Styleguide / Dropdown Menu',
  parameters: {
    component: DropdownMenu,
    componentSubtitle:
      'Dropdown menu component - composed from atomic elements',
  },
};

export const basic = () => {
  return (
    <DropdownMenu>
      <Header>Header</Header>
      <Item>Item #1</Item>
      <Item>Item #2</Item>
      <Divider />
      <Item>Item #3</Item>
      <Item>Item #4</Item>
    </DropdownMenu>
  );
};

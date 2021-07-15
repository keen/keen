import * as React from 'react';

import SideMenuComponent from './side-menu.component';
import { useState } from 'react';
export default {
  title: 'Components /Side Menu',
  parameters: {
    component: SideMenuComponent,
    componentSubtitle: 'Side menu component',
  },
};

const SideMenu = () => {
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

  const [activeItemId, setActiveItemId] = useState(menuItems[0].id);

  return (
    <div style={{ width: '400px', height: '300px' }}>
      <SideMenuComponent
        menuItems={menuItems}
        activeItemId={activeItemId}
        onChange={(activeItem) => setActiveItemId(activeItem)}
      />
    </div>
  );
};

export const basic = () => <SideMenu />;

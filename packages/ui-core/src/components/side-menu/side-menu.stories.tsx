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
  const menuItems = ['Menu item 1', 'Menu item 2', 'Menu item 3'];
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  return (
    <div style={{ width: '400px', height: '300px' }}>
      <SideMenuComponent
        menuItems={menuItems}
        activeItem={activeItem}
        onChange={(activeItem) => setActiveItem(activeItem)}
      />
    </div>
  );
};

export const basic = () => <SideMenu />;

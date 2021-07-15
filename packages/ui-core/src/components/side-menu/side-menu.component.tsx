import React, { FC } from 'react';
import { MenuItem, Menu } from './side-menu.styles';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

type Props = {
  menuItems: Item[];
  onChange: (item: string) => void;
  activeItemId?: string;
};

type Item = {
  id: string;
  label: string;
};

const SideMenu: FC<Props> = ({ menuItems, onChange, activeItemId }) => {
  const onActiveItemChange = (activeItem: Item) => {
    onChange(activeItem.id);
  };

  return (
    <Menu>
      <BodyText variant="body2" fontWeight="bold" color={colors.black[300]}>
        {menuItems.map((item) => (
          <MenuItem
            isActive={item.id === activeItemId}
            onClick={() => onActiveItemChange(item)}
            key={item.id}
          >
            {item.label}
          </MenuItem>
        ))}
      </BodyText>
    </Menu>
  );
};

export default SideMenu;

import React, { FC } from 'react';
import { MenuItem, Menu } from './side-menu.styles';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

type Props = {
  menuItems: string[];
  onChange: (item: string) => void;
  activeItem?: string;
};

const SideMenu: FC<Props> = ({ menuItems, onChange, activeItem }) => {
  const onActiveItemChange = (activeItem: string) => {
    onChange(activeItem);
  };

  return (
    <Menu>
      <BodyText variant="body2" fontWeight="bold" color={colors.black[300]}>
        {menuItems.map((item) => (
          <MenuItem
            isActive={item === activeItem}
            onClick={() => onActiveItemChange(item)}
            key={item}
          >
            {item}
          </MenuItem>
        ))}
      </BodyText>
    </Menu>
  );
};

export default SideMenu;

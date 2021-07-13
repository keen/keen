import React, { FC } from 'react';
import { MenuItem, Menu } from './side-menu.styles';
import { Title } from '../../typography';
import { colors } from '@keen.io/colors';

type Props = {
  menuItems: string[];
  onChange: (item: string) => void;
  activeItem?: string;
};

const SideMenuComponent: FC<Props> = ({ menuItems, onChange, activeItem }) => {
  const onActiveItemChange = (activeItem: string) => {
    onChange(activeItem);
  };

  return (
    <Menu>
      <Title variant="body-bold" color={colors.black[300]}>
        {menuItems.map((item) => (
          <MenuItem
            isActive={item === activeItem}
            onClick={() => onActiveItemChange(item)}
            key={item}
          >
            {item}
          </MenuItem>
        ))}
      </Title>
    </Menu>
  );
};

export default SideMenuComponent;

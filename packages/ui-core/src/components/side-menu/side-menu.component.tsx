import React, { FC } from 'react';
import { MenuItem, Menu } from './side-menu.styles';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';
import { KEYBOARD_KEYS } from '../../constants';

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
    <Menu role="tablist">
      {menuItems.map((item) => (
        <MenuItem
          isActive={item.id === activeItemId}
          onClick={() => onActiveItemChange(item)}
          onKeyDown={(e) => {
            if (e.keyCode === KEYBOARD_KEYS.ENTER) {
              onActiveItemChange(item);
            }
          }}
          key={item.id}
          role="tab"
          tabIndex={0}
        >
          <BodyText variant="body2" fontWeight="bold" color={colors.black[300]}>
            {item.label}
          </BodyText>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default SideMenu;

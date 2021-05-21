import React, { FC } from 'react';

import { Container, Item } from './radio-group.styles';

import { RadioItem } from '../../types';

type Props = {
  /** Collection of items */
  items: RadioItem[];
  /** Click event handler */
  onClick: (item: RadioItem) => void;
  /** Current active radio item */
  activeItem?: string;
};

const RadioGroup: FC<Props> = ({ items, onClick, activeItem }) => (
  <Container>
    {items.map((item) => (
      <Item
        key={item.id}
        isActive={item.id === activeItem}
        onClick={() => onClick(item)}
      >
        {item.label}
      </Item>
    ))}
  </Container>
);

export default RadioGroup;

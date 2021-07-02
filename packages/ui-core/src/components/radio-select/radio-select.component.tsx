import React, { FC } from 'react';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { Container, Item, Divider } from './radio-select.styles';

import { RadioItem } from '../../types';

type Props = {
  /** Collection of items */
  items: RadioItem[];
  /** Click event handler */
  onClick: (item: RadioItem) => void;
  /** Current active radio item */
  activeItem?: string;
};

const RadioGroup: FC<Props> = ({ items, activeItem, onClick }) => (
  <Container>
    {items.map((item, idx, arr) => (
      <React.Fragment key={item.id}>
        <Item isActive={item.id === activeItem} onClick={() => onClick(item)}>
          <BodyText variant="body2" color={colors.blue[500]}>
            {item.label}
          </BodyText>
        </Item>
        {idx < arr.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </Container>
);

export default RadioGroup;

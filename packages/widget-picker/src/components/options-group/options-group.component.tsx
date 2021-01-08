import React, { FC } from 'react';

import { Container, Group, Title, Item } from './options-group.styles';

import { OptionItem, OptionValue } from '../../types';

type Props = {
  /** Options group identifier */
  id: string;
  /** Options group title */
  title: string;
  /** Collection of options related with chart */
  options: OptionItem[];
  /** Current chart settings */
  settings: OptionValue;
  /** Select option event handler */
  onClick: (
    e: React.MouseEvent<HTMLDivElement>,
    id: string,
    settings: OptionValue
  ) => void;
  /** Parent option group active indicator */
  isActiveOption: boolean;
};

const OptionsGroup: FC<Props> = ({
  id,
  title,
  options,
  settings,
  isActiveOption,
  onClick,
}) => (
  <Container>
    <Title>{title}</Title>
    <Group>
      {options.map(({ label, isActive, defaultValue }) => (
        <Item
          key={label}
          isActive={isActiveOption && isActive(settings)}
          onClick={(e) => onClick(e, id, defaultValue)}
        >
          {label}
        </Item>
      ))}
    </Group>
  </Container>
);

export default OptionsGroup;

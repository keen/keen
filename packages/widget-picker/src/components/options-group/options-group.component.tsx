import React, { FC } from 'react';

import { Container, Group, Title, OptionItem } from './options-group.styles';

import { ChartOptionItem, ChartSettings } from '../../types';

type Props = {
  /** Options group identifier */
  id: string;
  /** Options group title */
  title: string;
  /** Collection of options related with chart */
  options: ChartOptionItem[];
  /** Current chart settings */
  settings: ChartSettings;
  /** Select option event handler */
  onClick: (
    e: React.MouseEvent<HTMLDivElement>,
    id: string,
    settings: ChartSettings
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
      {options.map(({ label, isActive, defaultChartSettings }) => (
        <OptionItem
          key={label}
          isActive={isActiveOption && isActive(settings)}
          onClick={e => onClick(e, id, defaultChartSettings)}
        >
          {label}
        </OptionItem>
      ))}
    </Group>
  </Container>
);

export default OptionsGroup;

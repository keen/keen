import React from 'react';
import { Icon } from '@keen.io/icons';
import { ArrowsType } from '../../types';
import { UpArrow, DownArrow, Container } from './table.styles';

type Props = {
  type: ArrowsType;
};

export const SortArrows = ({ type = 'asc' }: Props) => {
  return (
    <Container style={{ paddingLeft: '3px' }}>
      <UpArrow opacity={type === 'desc' ? 1 : 0.3}>
        <Icon type="arrow-up" fill="white" width={10} />
      </UpArrow>
      <DownArrow opacity={type === 'asc' ? 1 : 0.3}>
        <Icon type="arrow-down" fill="white" width={10} />
      </DownArrow>
    </Container>
  );
};

export default SortArrows;

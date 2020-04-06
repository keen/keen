import React from 'react';
import { Icon } from '@keen.io/icons';
import { SortMode } from '../../types';
import { UpArrow, DownArrow, Container } from './table.styles';

type Props = {
  sortMode: SortMode;
};

export const SortArrows = ({ sortMode = 'ascending' }: Props) => {
  return (
    <Container style={{ paddingLeft: '3px' }}>
      <UpArrow opacity={sortMode === 'descending' ? 1 : 0.3}>
        <Icon type="arrow-up" fill="white" width={10} />
      </UpArrow>
      <DownArrow opacity={sortMode === 'ascending' ? 1 : 0.3}>
        <Icon type="arrow-down" fill="white" width={10} />
      </DownArrow>
    </Container>
  );
};

export default SortArrows;

import React, { FC } from 'react';
import { transparentize } from 'polished';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { ItemsPerPage } from './components';
import { Container } from './table-footer.styles';

type Props = {
  /** Number of rows */
  rows: number;
  /** Tabs configuration */
  tabs?: { label: string; id: string }[];
  /** Active Tab */
  activeTab?: string;
  /** Click event handler */
  onClick?: (tabId: string) => void;
};

const TableFooter: FC<Props> = ({ rows }) => (
  <Container aria-role="rowgroup">
    <BodyText variant="body2" color={transparentize(0.5, colors.black[500])}>
      {rows} rows
    </BodyText>
    <div>pagination</div>
    <ItemsPerPage
      selectedOption={15}
      onChange={(option) => console.log(option)}
    />
  </Container>
);

export default TableFooter;

import React from 'react';
import { UseRowSelectInstanceProps } from 'react-table';

import { HeaderCellContent } from '../header-cell-content';
import { SelectRow } from '../select-row';

type Props = UseRowSelectInstanceProps<Record<string, any>>;

export const SelectColumnHeader = ({
  getToggleAllRowsSelectedProps,
}: Props) => (
  <HeaderCellContent>
    <SelectRow {...getToggleAllRowsSelectedProps()} />
  </HeaderCellContent>
);

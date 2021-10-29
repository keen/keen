import React from 'react';
import { UseRowSelectInstanceProps } from 'react-table';

import { HeaderCellContent } from '../header-cell-content';
import { SelectRow } from '../select-row';

type Props = UseRowSelectInstanceProps<Record<string, any>>;

export const SelectColumnHeader = ({
  getToggleAllRowsSelectedProps,
  toggleAllRowsSelected,
}: Props) => {
  return (
    <HeaderCellContent onClick={() => toggleAllRowsSelected()}>
      <SelectRow
        id="select-all-rows"
        checkboxVariant="highlight"
        {...getToggleAllRowsSelectedProps()}
      />
    </HeaderCellContent>
  );
};

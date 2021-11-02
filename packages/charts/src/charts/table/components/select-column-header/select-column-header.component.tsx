import React from 'react';
import { UseRowSelectInstanceProps } from 'react-table';

import { HeaderCellContent } from '../header-cell-content';
import { SelectRow } from '../select-row';

type Props = UseRowSelectInstanceProps<Record<string, any>> & {
  editMode: boolean;
};

export const SelectColumnHeader = ({
  getToggleAllRowsSelectedProps,
  toggleAllRowsSelected,
  editMode,
}: Props) => {
  return (
    <HeaderCellContent onClick={() => !editMode && toggleAllRowsSelected()}>
      <SelectRow
        id="select-all-rows"
        checkboxVariant="highlight"
        {...getToggleAllRowsSelectedProps()}
      />
    </HeaderCellContent>
  );
};

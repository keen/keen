import React from 'react';
import { UseRowSelectInstanceProps } from 'react-table';
import { Checkbox, MousePositionedTooltip } from '@keen.io/ui-core';

import { HeaderCellContent } from '../../header-cell-content';

type Props = UseRowSelectInstanceProps<Record<string, any>> & {
  /** Table edit mode indicator */
  editMode: boolean;
};

export const Header = ({
  getToggleAllRowsSelectedProps,
  toggleAllRowsSelected,
  editMode,
}: Props) => {
  const { checked } = getToggleAllRowsSelectedProps();

  return (
    <HeaderCellContent
      onClick={() => !editMode && toggleAllRowsSelected()}
      textAlignment="center"
    >
      <MousePositionedTooltip
        isActive={!editMode}
        tooltipPinPlacement="bottom-right"
        renderContent={() =>
          checked ? 'Unselect all rows' : 'Select all rows'
        }
      >
        <Checkbox
          id="select-all-rows"
          type="highlight"
          display="inline-flex"
          checked={checked}
        />
      </MousePositionedTooltip>
    </HeaderCellContent>
  );
};

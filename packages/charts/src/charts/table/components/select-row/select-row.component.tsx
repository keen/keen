import React, { FC } from 'react';
import { TableToggleAllRowsSelectedProps } from 'react-table';
import { Checkbox } from '@keen.io/ui-core';

interface SelectRowProps extends TableToggleAllRowsSelectedProps {
  /* Checkbox identifer */
  id: string;
  /* Checkbox component variant */
  checkboxVariant?: 'primary' | 'secondary' | 'highlight';
}

const SelectRow: FC<SelectRowProps> = ({
  checked,
  id,
  checkboxVariant = 'secondary',
}) => <Checkbox id={id} type={checkboxVariant} checked={checked} />;

export default SelectRow;

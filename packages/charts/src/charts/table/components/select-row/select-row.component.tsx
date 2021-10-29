import React from 'react';
import { TableToggleAllRowsSelectedProps } from 'react-table';
import { Checkbox } from '@keen.io/ui-core';

interface SelectRowProps extends TableToggleAllRowsSelectedProps {
  /* Checkbox identifer */
  id: string;
  /* Checkbox component variant */
  checkboxVariant?: 'primary' | 'secondary' | 'highlight';
}

const SelectRow = React.forwardRef(
  (
    {
      checked,
      onChange,
      indeterminate,
      id,
      checkboxVariant = 'secondary',
    }: SelectRowProps,
    ref: React.MutableRefObject<HTMLInputElement>
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <label htmlFor={id} onClick={(e) => e.stopPropagation()}>
        <Checkbox
          id={id}
          ref={resolvedRef}
          type={checkboxVariant}
          onChange={(e) => {
            onChange(e as React.ChangeEvent<Element>);
          }}
          checked={checked}
        />
      </label>
    );
  }
);

SelectRow.displayName = 'SelectRow';

export default SelectRow;

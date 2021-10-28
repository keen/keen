import React from 'react';
import { TableToggleAllRowsSelectedProps } from 'react-table';

const SelectRow = React.forwardRef(
  (
    { indeterminate, ...rest }: TableToggleAllRowsSelectedProps,
    ref: React.MutableRefObject<HTMLInputElement>
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

SelectRow.displayName = 'SelectRow';

export default SelectRow;

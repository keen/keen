import { useState, useEffect } from 'react';

type Options = {
  enabled: boolean;
};

export const useRowsGroupSelection = ({ enabled }: Options) => {
  const [selectionOffset, setSelectionOffset] = useState(null);

  const getSelectionOffsetRange = (rowId: string): string[] | null => {
    const parsedRowId = parseInt(rowId);
    const parsedSelectionOffset = parseInt(selectionOffset);

    const startOffset =
      parsedRowId > parsedSelectionOffset ? parsedSelectionOffset : parsedRowId;
    const endOffset =
      parsedSelectionOffset > parsedRowId ? parsedSelectionOffset : parsedRowId;

    if (startOffset === endOffset) return null;
    return new Array(endOffset - startOffset + 1)
      .fill(startOffset)
      .map((offset, idx) => (offset + idx).toString());
  };

  useEffect(() => {
    if (enabled) {
      const eventListener = (e: KeyboardEvent) => {
        if (e.key === 'Shift') setSelectionOffset(null);
      };
      document.addEventListener('keyup', eventListener);
      return () => document.removeEventListener('keyup', eventListener);
    }
  }, [enabled]);

  return {
    getSelectionOffsetRange,
    setSelectionOffset,
    selectionOffset,
  };
};

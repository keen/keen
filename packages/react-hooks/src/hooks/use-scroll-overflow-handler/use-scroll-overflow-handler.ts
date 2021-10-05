import React, { useCallback, useEffect, useState } from 'react';
import { getElementOffset, hasContentOverflow } from '@keen.io/charts-utils';

/**
 * Hook that allows to detect how referenced element overflows parent
 * @param containerRef: ref of element
 * @returns overflowRight: determines if element overflows parent from right side
 * @returns overflowLeft: determines if element overflows parent from left side
 * @returns scrollHandler: function which allows to calculate scroll position
 */
export const useScrollOverflowHandler = (
  containerRef: React.MutableRefObject<any>
) => {
  const [maxScroll, setMaxScroll] = useState(0);
  const [{ overflowLeft, overflowRight }, setOverflow] = useState({
    overflowLeft: false,
    overflowRight: false,
  });

  const calculateMaxScroll = useCallback(() => {
    const { offset, scroll: offsetScroll } = getElementOffset(
      containerRef.current,
      'horizontal'
    );
    setMaxScroll(offsetScroll - offset);
  }, [containerRef]);

  const scrollHandler = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const offset = e.currentTarget.scrollLeft;
      const hasOverflowLeft = offset > 0;
      const hasOverflowRight = offset < maxScroll;
      if (
        hasOverflowLeft !== overflowLeft ||
        hasOverflowRight !== overflowRight
      ) {
        setOverflow({
          overflowLeft: hasOverflowLeft,
          overflowRight: hasOverflowRight,
        });
      }
    },
    [maxScroll, overflowLeft, overflowRight]
  );

  useEffect(() => {
    const hasOverflow = hasContentOverflow('horizontal', containerRef.current);
    if (hasOverflow) {
      setOverflow((state) => ({
        ...state,
        overflowRight: true,
      }));
    }
    calculateMaxScroll();
  }, []);

  return {
    overflowRight,
    overflowLeft,
    scrollHandler,
  };
};

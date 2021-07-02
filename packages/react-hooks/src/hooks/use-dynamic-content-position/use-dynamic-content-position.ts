import { RefObject, useState } from 'react';
/**
 * Hook that allows to calculate position below parent element
 * @param parentRef: ref of element under which position should be calculated
 */
export const useDynamicContentPosition = (
  parentRef: RefObject<HTMLElement>
) => {
  const [contentPosition, setContentPosition] = useState({
    x: 0,
    y: 0,
  });

  const setPosition = () => {
    const parentRect = parentRef.current.getBoundingClientRect();
    console.log('parentRect', parentRect);
    setContentPosition({
      x: parentRect.x,
      y: parentRect.y + window.scrollY + parentRect.height,
    });
  };

  return {
    setPosition,
    contentPosition,
  };
};

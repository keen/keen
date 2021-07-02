import { RefObject, useCallback, useEffect } from 'react';
/**
 * Hook that allows to detect click outside of the element and call function passed as parameter
 * @param containerRef ref of element
 * @param onClickOutside: function to call on click outside
 */
export const useOnClickOutside = (
  containerRef: RefObject<HTMLElement>,
  onClickOutside: () => void
) => {
  const outsideClick = useCallback(
    (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClickOutside();
      }
    },
    [containerRef, onClickOutside]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [containerRef, onClickOutside]);
};

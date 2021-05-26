import { RefObject, useCallback, useEffect } from 'react';

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

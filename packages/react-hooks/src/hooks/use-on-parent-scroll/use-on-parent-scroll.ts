import { RefObject, useEffect } from 'react';

/**
 * Hook that allows to detect referenced element scroll event and call function in order to e.g. hide element or change its position
 * @param scrollableContainerRef: ref of element
 * @param onScroll: function to call on ref element scroll
 */
export const useOnParentScroll = (
  scrollableContainerRef: RefObject<HTMLElement>,
  onScroll: () => void
) => {
  useEffect(() => {
    scrollableContainerRef?.current?.addEventListener('scroll', onScroll);
    return () => {
      scrollableContainerRef?.current?.removeEventListener('scroll', onScroll);
    };
  }, [scrollableContainerRef]);
};

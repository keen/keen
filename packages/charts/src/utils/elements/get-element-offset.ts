export const getElementOffset = (
  element: HTMLElement,
  mode: 'vertical' | 'horizontal'
) => {
  const { offsetWidth, scrollWidth, scrollHeight, offsetHeight } = element;
  return mode === 'horizontal'
    ? {
        offset: offsetWidth,
        scroll: scrollWidth,
      }
    : {
        offset: offsetHeight,
        scroll: scrollHeight,
      };
};

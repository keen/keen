/**
 * Get the HTMLElement offset based on layout.
 *
 * @param element - HTMLElement reference
 * @param mode - element layout mode
 * @return object with offset and scroll values.
 *
 */
const getElementOffset = (
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

export default getElementOffset;

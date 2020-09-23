/**
 * Checks the HTMLElement content overflow based on layout.
 *
 * @param layout - element layout
 * @param element - HTMLElement reference
 * @return content overflow indicator
 *
 */
const hasContentOverflow = (
  layout: 'vertical' | 'horizontal',
  { offsetHeight, offsetWidth, scrollHeight, scrollWidth }: HTMLElement
) =>
  layout === 'horizontal'
    ? offsetWidth < scrollWidth
    : offsetHeight < scrollHeight;

export default hasContentOverflow;

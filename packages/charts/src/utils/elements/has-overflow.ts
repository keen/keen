import { Layout } from '@keen.io/ui-core';

export const hasOverflow = (
  layout: Layout,
  { offsetHeight, offsetWidth, scrollHeight, scrollWidth }: HTMLElement
) =>
  layout === 'horizontal'
    ? offsetWidth < scrollWidth
    : offsetHeight < scrollHeight;

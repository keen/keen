import React, { useState, useEffect } from 'react';

import { Layout, Position } from '@keen.io/ui-core';

export type RenderMode = 'list' | 'group' | 'slider';

export type ContentDimension = {
  offset: number;
  scroll: number;
};

export const hasContentOverflow = (
  layout: Layout,
  { offsetHeight, offsetWidth, scrollHeight, scrollWidth }: HTMLElement
) =>
  layout === 'horizontal'
    ? offsetWidth < scrollWidth
    : offsetHeight < scrollHeight;

export const useRenderMode = (
  element: React.MutableRefObject<HTMLElement>,
  layout: Layout,
  position: Position,
  initialMode: RenderMode,
  labelsLength?: number
) => {
  const [mode, setMode] = useState<RenderMode>(initialMode);
  const [initialDimension, setDimension] = useState<ContentDimension>({
    offset: 0,
    scroll: 0,
  });

  useEffect(() => {
    setMode(initialMode);
  }, [layout, position, initialMode, labelsLength]);

  useEffect(() => {
    const hasOverflow = hasContentOverflow(layout, element.current);

    const {
      offsetHeight,
      offsetWidth,
      scrollHeight,
      scrollWidth,
    } = element.current;

    if (hasOverflow && layout === 'horizontal') {
      switch (mode) {
        case 'list':
          setDimension({ offset: offsetWidth, scroll: scrollWidth });
          setMode('group');
          break;
        case 'group':
          setMode('slider');
          break;
      }
    }

    if (hasOverflow && layout === 'vertical') {
      switch (mode) {
        case 'list':
          setDimension({ offset: offsetHeight, scroll: scrollHeight });
          setMode('slider');
          break;
      }
    }
  }, [mode, layout, element, labelsLength]);

  return { mode, initialDimension };
};

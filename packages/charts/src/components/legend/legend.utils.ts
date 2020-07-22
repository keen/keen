import React, { useState, useEffect } from 'react';
import { Layout, Position } from '@keen.io/ui-core';

import { hasOverflow } from '../../utils/elements';

export type RenderMode = 'list' | 'group' | 'slider';

export type ContentDimension = {
  offset: number;
  scroll: number;
};

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
    const contentOverflow = hasOverflow(layout, element.current);

    const {
      offsetHeight,
      offsetWidth,
      scrollHeight,
      scrollWidth,
    } = element.current;

    if (contentOverflow && layout === 'horizontal') {
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

    if (contentOverflow && layout === 'vertical') {
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

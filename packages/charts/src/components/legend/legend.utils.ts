import React, { useState, useEffect } from 'react';
import { Layout, Position } from '@keen.io/ui-core';
import { hasContentOverflow } from '@keen.io/charts-utils';

import { Variant } from './slider/types';
import { BUTTON_DIMENSION, BUTTON_SHADOW_SIZE } from './slider-button';

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
    const contentOverflow = hasContentOverflow(layout, element.current);

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

export const createSliderTransition = (
  variant: Variant,
  index: number,
  itemSize: number,
  itemGap: number,
  sliderSize: number
) => {
  const itemPosition =
    index * (itemSize + itemGap) + (BUTTON_DIMENSION + BUTTON_SHADOW_SIZE);
  const itemPositionPrevious = itemPosition - sliderSize - itemSize - itemGap;
  const itemPositionNext = itemPosition + sliderSize + itemSize + itemGap;

  if (variant === 'horizontal')
    return {
      initial: (direction: number) => ({
        x: direction > 0 ? itemPositionNext : itemPositionPrevious,
        y: '-50%',
        top: '50%',
      }),
      animate: { x: itemPosition },
      exit: (direction: number) => ({
        x: direction < 0 ? itemPositionNext : itemPositionPrevious,
      }),
    };
  return {
    initial: (direction: number) => ({
      y: direction > 0 ? itemPositionNext : itemPositionPrevious,
      x: 15,
      width: 'calc(100% - 30px)',
    }),
    animate: { y: itemPosition },
    exit: (direction: number) => ({
      y: direction < 0 ? itemPositionNext : itemPositionPrevious,
    }),
  };
};

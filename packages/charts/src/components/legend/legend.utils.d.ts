import React from 'react';
import { Position, Layout } from '@keen.io/ui-core';
export declare type RenderMode = 'list' | 'group' | 'slider';
export declare type ContentDimension = {
  offset: number;
  scroll: number;
};
export declare const hasContentOverflow: (
  layout: Layout,
  { offsetHeight, offsetWidth, scrollHeight, scrollWidth }: HTMLElement
) => boolean;
export declare const useRenderMode: (
  element: React.MutableRefObject<HTMLElement>,
  layout: Layout,
  position: Position,
  initialMode: RenderMode
) => {
  mode: RenderMode;
  initialDimension: ContentDimension;
};

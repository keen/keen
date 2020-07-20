import React, { MutableRefObject, useRef, useState, useCallback } from 'react';

import { TooltipState, DataSelector } from '../types';

export const useTooltip = (
  container: MutableRefObject<any>,
  computeRelativeToTarget?: boolean,
  tooltipRef?: MutableRefObject<any>
) => {
  const tooltipUpdate = useRef(null);

  const [tooltip, setTooltip] = useState<
    TooltipState & { meta?: Record<string, any> }
  >({
    selectors: null,
    meta: null,
    visible: false,
    x: 0,
    y: 0,
  });

  const updateTooltipPosition = useCallback(
    (
      e: React.MouseEvent,
      selectors?: { selector: DataSelector; color: string }[],
      meta?: Record<string, any>
    ) => {
      if (tooltipUpdate.current) cancelAnimationFrame(tooltipUpdate.current);
      e.persist();
      const {
        top,
        left,
        width,
        height,
      }: ClientRect = container.current.getBoundingClientRect();

      let maxOffsetX = width;
      let maxOffsetY = height;
      let tooltipX = e.pageX - left - window.scrollX;
      let tooltipY = e.pageY - top - window.scrollY;

      if (computeRelativeToTarget) {
        const eventTarget = e.target as HTMLElement;
        const targetRect = eventTarget.getBoundingClientRect();

        tooltipX = Math.abs(left - targetRect.left) + targetRect.width / 2;
        tooltipY = Math.abs(top - targetRect.top) + targetRect.height / 2;
      }

      if (tooltipRef?.current) {
        const {
          width: tooltipWidth,
          height: tooltipHeight,
        }: ClientRect = tooltipRef.current.getBoundingClientRect();
        maxOffsetX = width - tooltipWidth;
        maxOffsetY = height - tooltipHeight;
      }

      if (tooltipX > maxOffsetX) {
        tooltipX = maxOffsetX;
      }

      if (tooltipY > maxOffsetY) {
        tooltipY = maxOffsetY;
      }

      tooltipUpdate.current = requestAnimationFrame(() => {
        setTooltip({
          visible: true,
          selectors,
          meta,
          x: tooltipX,
          y: tooltipY,
        });
      });
    },
    [container, computeRelativeToTarget, tooltipRef]
  );

  const hideTooltip = useCallback(() => {
    if (tooltipUpdate.current) cancelAnimationFrame(tooltipUpdate.current);
    setTooltip(currentState => ({
      ...currentState,
      visible: false,
      selectors: null,
    }));
  }, []);

  return {
    hideTooltip,
    updateTooltipPosition,
    tooltipMeta: tooltip.meta,
    tooltipSelectors: tooltip.selectors,
    tooltipPosition: { x: tooltip.x, y: tooltip.y },
    tooltipVisible: tooltip.visible,
  };
};

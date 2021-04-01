import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal, Tooltip, TooltipMode, UI_LAYERS } from '@keen.io/ui-core';

export const TOOLTIP_MOTION = {
  transition: { duration: 0.3 },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type TooltipContentProps = {
  tooltipPosition: { x: number; y: number };
  children: React.ReactNode;
  tooltipVisible: boolean;
  tooltipTheme: TooltipMode;
};

const TooltipContent = ({
  tooltipPosition,
  children,
  tooltipVisible,
  tooltipTheme,
}: TooltipContentProps) => (
  <AnimatePresence>
    {tooltipVisible && (
      <motion.div
        {...TOOLTIP_MOTION}
        initial={{
          opacity: 0,
          x: tooltipPosition.x,
          y: tooltipPosition.y,
          top: 0,
          left: 0,
        }}
        animate={{
          x: tooltipPosition.x,
          y: tooltipPosition.y,
          opacity: 1,
        }}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: UI_LAYERS.tooltip,
          width: 225,
        }}
      >
        <Tooltip hasArrow={false} fontSize={12} mode={tooltipTheme}>
          {children}
        </Tooltip>
      </motion.div>
    )}
  </AnimatePresence>
);

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  tooltipPortal?: string;
  tooltipTheme?: TooltipMode;
  renderContent: () => React.ReactNode;
};

const MousePositionedTooltip = ({
  children,
  isActive,
  tooltipPortal,
  tooltipTheme = 'light',
  renderContent,
}: Props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const tooltipContainerRef = useRef<HTMLDivElement>(null);
  const requestFrameRef = React.useRef(null);

  return (
    <div
      data-testid="tooltip-container"
      ref={tooltipContainerRef}
      onMouseEnter={(e) => {
        setTooltipVisible(true);
        setTooltipPosition({ x: e.clientX, y: e.clientY });
      }}
      onMouseMove={(e) => {
        const mousePosition = { x: e.clientX, y: e.clientY };
        if (requestFrameRef.current)
          cancelAnimationFrame(requestFrameRef.current);
        requestFrameRef.current = requestAnimationFrame(() => {
          setTooltipPosition(mousePosition);
        });
      }}
      onMouseLeave={() => {
        setTooltipVisible(false);
      }}
    >
      {children}
      {isActive && (
        <>
          {tooltipPortal ? (
            <Portal modalContainer={tooltipPortal}>
              <TooltipContent
                tooltipPosition={tooltipPosition}
                tooltipVisible={tooltipVisible}
                tooltipTheme={tooltipTheme}
              >
                {renderContent()}
              </TooltipContent>
            </Portal>
          ) : (
            <TooltipContent
              tooltipPosition={tooltipPosition}
              tooltipVisible={tooltipVisible}
              tooltipTheme={tooltipTheme}
            >
              {renderContent()}
            </TooltipContent>
          )}
        </>
      )}
    </div>
  );
};

export default MousePositionedTooltip;

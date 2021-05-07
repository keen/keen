import React, { useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from '../portal';
import Tooltip from '../tooltip';
import DynamicPortal from '../dynamic-portal';
import { TooltipMode } from '../tooltip';
import { UI_LAYERS } from '../../constants';
import { TooltipWrapper } from './mouse-positioned-tooltip.styles';
import { TooltipPinPlacements } from './types';
import { getTooltipTranslation } from './utils/getTooltipTranslation';

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
  tooltipPinPlacement?: TooltipPinPlacements;
};

const TooltipContent = ({
  tooltipPosition,
  children,
  tooltipVisible,
  tooltipTheme,
  tooltipPinPlacement,
}: TooltipContentProps) => {
  const tooltipTranslation = getTooltipTranslation(tooltipPinPlacement);

  return (
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
            maxWidth: 225,
          }}
        >
          <TooltipWrapper
            translateX={tooltipTranslation.x}
            translateY={tooltipTranslation.y}
          >
            <Tooltip hasArrow={false} mode={tooltipTheme}>
              {children}
            </Tooltip>
          </TooltipWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  tooltipPortal?: string;
  tooltipTheme?: TooltipMode;
  renderContent: () => React.ReactNode;
  tooltipPinPlacement?: TooltipPinPlacements;
};

const MousePositionedTooltip = ({
  children,
  isActive,
  tooltipPortal,
  tooltipTheme = 'light',
  tooltipPinPlacement = 'bottom-right',
  renderContent,
}: Props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const tooltipContainerRef = useRef<HTMLDivElement>(null);
  const requestFrameRef = React.useRef(null);

  const calculateTooltipPosition = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (tooltipPortal) {
        return { x: e.clientX, y: e.clientY + window.scrollY };
      } else {
        return { x: e.clientX, y: e.clientY };
      }
    },
    [tooltipPortal]
  );

  return (
    <div
      ref={tooltipContainerRef}
      onMouseEnter={(e) => {
        e.persist();
        setTooltipVisible(true);
        setTooltipPosition(calculateTooltipPosition(e));
      }}
      onMouseMove={(e) => {
        e.persist();
        if (requestFrameRef.current)
          cancelAnimationFrame(requestFrameRef.current);
        requestFrameRef.current = requestAnimationFrame(() => {
          setTooltipPosition(calculateTooltipPosition(e));
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
                tooltipPinPlacement={tooltipPinPlacement}
              >
                {renderContent()}
              </TooltipContent>
            </Portal>
          ) : (
            tooltipVisible && (
              <DynamicPortal>
                <TooltipContent
                  tooltipPosition={tooltipPosition}
                  tooltipVisible
                  tooltipTheme={tooltipTheme}
                  tooltipPinPlacement={tooltipPinPlacement}
                >
                  {renderContent()}
                </TooltipContent>
              </DynamicPortal>
            )
          )}
        </>
      )}
    </div>
  );
};

export default MousePositionedTooltip;

import { AnimatePresence, motion } from 'framer-motion';
import { TOOLTIP_MOTION } from '../../../../constants';
import { Tooltip } from '@keen.io/ui-core';
import React, { FC, RefObject } from 'react';
import { Tooltip as TooltipSettings } from '../../../../types';
import { Portal } from '../../../../components';

type Props = {
  tooltipPosition: { x: number; y: number };
  tooltipSettings: Pick<TooltipSettings, 'mode' | 'labels'>;
  children: React.ReactNode;
  portalRef?: RefObject<HTMLDivElement>;
};

const TooltipContent = ({
  tooltipPosition,
  tooltipSettings,
  children,
}: Pick<Props, 'tooltipPosition' | 'tooltipSettings' | 'children'>) => (
  <AnimatePresence>
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
        position: 'fixed',
        pointerEvents: 'none',
      }}
    >
      <Tooltip mode={tooltipSettings.mode} hasArrow={false}>
        {children}
      </Tooltip>
    </motion.div>
  </AnimatePresence>
);

export const MetricTooltip: FC<Props> = ({
  tooltipPosition,
  tooltipSettings,
  children,
  portalRef,
}) => (
  <>
    {portalRef && portalRef.current ? (
      <Portal portalRef={portalRef.current}>
        <TooltipContent
          tooltipPosition={tooltipPosition}
          tooltipSettings={tooltipSettings}
        >
          {children}
        </TooltipContent>
      </Portal>
    ) : (
      <TooltipContent
        tooltipPosition={tooltipPosition}
        tooltipSettings={tooltipSettings}
      >
        {children}
      </TooltipContent>
    )}
  </>
);

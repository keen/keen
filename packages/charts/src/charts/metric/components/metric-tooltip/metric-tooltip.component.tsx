import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from '@keen.io/ui-core';
import { TOOLTIP_MOTION } from '../../../../constants';
import { Tooltip as TooltipSettings } from '../../../../types';

type Props = {
  tooltipPosition: { x: number; y: number };
  tooltipSettings: Pick<TooltipSettings, 'mode' | 'labels'>;
  children: React.ReactNode;
};

export const MetricTooltip = ({
  tooltipPosition,
  tooltipSettings,
  children,
}: Props) => (
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

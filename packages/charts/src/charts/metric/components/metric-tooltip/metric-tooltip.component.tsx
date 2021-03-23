import { AnimatePresence, motion } from 'framer-motion';
import { TOOLTIP_MOTION } from '../../../../constants';
import { Text, Tooltip } from '@keen.io/ui-core';
import React, { FC } from 'react';

type Props = {
  tooltipPosition: { x: number; y: number };
  tooltipSettings: any;
  tooltipDescription: string;
};

export const MetricTooltip: FC<Props> = ({
  tooltipPosition,
  tooltipSettings,
  tooltipDescription,
}) => (
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
        position: 'absolute',
        pointerEvents: 'none',
      }}
    >
      <Tooltip mode={tooltipSettings.mode} hasArrow={false}>
        <Text {...tooltipSettings.labels.typography}>{tooltipDescription}</Text>
      </Tooltip>
    </motion.div>
  </AnimatePresence>
);

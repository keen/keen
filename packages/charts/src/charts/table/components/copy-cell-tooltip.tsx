import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Text, Tooltip } from '@keen.io/ui-core';

import { Tooltip as TooltipSettings, TooltipState } from '../../../types';
import { TOOLTIP_MOTION } from '../../../constants';

type Props = {
  tooltipState: TooltipState;
  tooltipSettings: TooltipSettings;
};
export const CopyCellTooltip = ({ tooltipState, tooltipSettings }: Props) => {
  return (
    <AnimatePresence>
      {tooltipState.visible && (
        <motion.div
          {...TOOLTIP_MOTION}
          initial={{ opacity: 0, x: tooltipState.x, y: tooltipState.y }}
          animate={{
            x: tooltipState.x,
            y: tooltipState.y,
            opacity: 1,
          }}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <Tooltip mode={tooltipSettings.mode} hasArrow={false}>
            <Text {...tooltipSettings.labels.typography}>Cell copied!</Text>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

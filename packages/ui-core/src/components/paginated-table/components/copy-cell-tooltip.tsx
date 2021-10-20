import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import Tooltip from '../../tooltip';
import { Text } from '../../../typography';

import { TOOLTIP_MOTION } from '../paginated-table.component';
import { TooltipState } from '../types';

type Props = {
  tooltipState: TooltipState;
  tooltipSettings: any;
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

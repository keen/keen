import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import Tooltip from '../../tooltip';
import Text from '../../typography-settings';

import { TOOLTIP_MOTION } from '../paginated-table.component';

type Props = {
  tooltipState: any;
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

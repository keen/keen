import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StyledCeil, TableCell } from './table.styles';
import { CeilType } from '../../types';
import Tooltip from '../tooltip';

type Props = {
  value?: CeilType;
  onClick?: (value: CeilType) => void;
  tooltipEnabled?: boolean;
  tooltipContent?: string | React.ReactNode;
};

const tooltipMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Ceil = ({
  value,
  onClick,
  tooltipEnabled = true,
  tooltipContent = 'Copied!',
}: Props) => {
  const [tooltip, setTooltip] = useState(false);

  const toogleTooltip = () => {
    onClick(value);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 1000);
  };
  const type = `${typeof value}`;
  const textAlign = type === 'number' ? 'right' : 'left';
  return (
    <>
      <StyledCeil
        onClick={() => {
          toogleTooltip();
        }}
        textAlign={textAlign}
      >
        {value}
        <AnimatePresence>
          {tooltipEnabled && tooltip && (
            <motion.div
              {...tooltipMotion}
              style={{ position: 'absolute', top: '50%', left: '50%' }}
            >
              <Tooltip hasArrow={false} mode="dark">
                {tooltipContent}
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </StyledCeil>
      <TableCell
        onClick={() => {
          toogleTooltip();
        }}
      />
    </>
  );
};

export default Ceil;

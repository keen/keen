import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StyledCeil } from './table.styles';
import { CeilType } from '../../types';
import Tooltip from '../tooltip';

type Props = {
  children?: CeilType;
  onClick?: (children: CeilType) => void;
  tooltipEnabled?: boolean;
  tooltipContent?: string | React.ReactNode;
  format?: (children: CeilType) => void;
};

const tooltipMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Ceil = ({
  children,
  onClick,
  tooltipEnabled = true,
  tooltipContent = 'Copied!',
  format,
}: Props) => {
  const [tooltip, setTooltip] = useState(false);

  const toogleTooltip = () => {
    onClick(children);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 1000);
  };
  const type = `${typeof children}`;
  return (
    <>
      <StyledCeil
        onClick={() => {
          toogleTooltip();
        }}
        type={type}
      >
        {format ? format(children) : children}
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
      <div
        onClick={() => {
          toogleTooltip();
        }}
        className="tableCell"
        style={{
          display: 'table-cell',
        }}
      ></div>
    </>
  );
};

export default Ceil;

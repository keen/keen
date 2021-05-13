/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useRef, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Arc, DefaultArcObject } from 'd3-shape';

import { PieLabel } from '../../components';
import { StyledPath } from './pie-slice.styles';

import { createArcTween, animateArcPath, ArcProperties } from '../../utils';
import { SliceState } from '../../types';

import { ChartContext, ChartContextType } from '../../contexts';

const sliceTransition = { duration: 0.2, ease: 'easeInOut' };

const sliceVariants = {
  hidden: { opacity: 0 },
  remove: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      delay: 0.5,
    },
  },
};

type Props = {
  draw: Arc<any, DefaultArcObject>;
  startAngle: number;
  endAngle: number;
  autocolor: boolean;
  labelPosition: [number, number];
  activePosition: [number, number];
  label: string;
  background: string;
  id: string;
  activeKey?: string;
  onMouseMove: (e: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<SVGGElement, MouseEvent>) => void;
};

const PieSlice: FC<Props> = ({
  background,
  draw,
  activePosition,
  autocolor,
  label,
  startAngle,
  endAngle,
  labelPosition,
  id,
  activeKey,
  onMouseLeave,
  onMouseMove,
}) => {
  const [arcProperties, setArcProperties] = useState<ArcProperties>({
    startAngle,
    endAngle,
  });
  const element = useRef(null);
  const [sliceState, setSliceState] = useState<SliceState>(null);

  const { theme } = useContext(ChartContext) as ChartContextType;
  const {
    pie: { labels },
  } = theme;

  const [x, y] = activePosition;
  const [labelX, labelY] = labelPosition;

  const activeVariants = {
    initial: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    inactive: {
      opacity: 0.2,
      x: 0,
      y: 0,
    },
    hover: {
      opacity: 1,
      x,
      y,
    },
    active: {
      opacity: 1,
      x,
      y,
    },
  };

  useEffect(() => {
    const motion = createArcTween(
      arcProperties,
      { startAngle, endAngle },
      draw
    );

    requestAnimationFrame(() => {
      animateArcPath(element, motion, () => {
        setArcProperties({
          startAngle,
          endAngle,
        });
      });
    });
  }, [startAngle, endAngle]);

  useEffect(() => {
    if (activeKey) {
      setSliceState(activeKey === id ? 'active' : 'inactive');
    } else {
      setSliceState('initial');
    }
  }, [activeKey]);

  return (
    <motion.g
      data-testid={id}
      variants={sliceVariants}
      initial="hidden"
      animate="show"
      exit="remove"
    >
      <motion.g
        onMouseMove={onMouseMove}
        onMouseEnter={() => setSliceState('hover')}
        onMouseLeave={(e) => {
          onMouseLeave(e);
          setSliceState('initial');
        }}
        variants={activeVariants}
        animate={sliceState}
        initial="initial"
        style={{ originX: '0', originY: '0' }}
        transition={sliceTransition}
      >
        <StyledPath
          dropShadow={sliceState === 'hover'}
          ref={element}
          d={draw(arcProperties as DefaultArcObject)}
          key={background}
          fill={background}
        />
        {labels.enabled && (
          <motion.g
            initial={false}
            animate={{ x: labelX, y: labelY }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <PieLabel
              sliceBackground={background}
              autocolor={autocolor}
              {...labels.typography}
            >
              {label}
            </PieLabel>
          </motion.g>
        )}
      </motion.g>
    </motion.g>
  );
};

export default PieSlice;

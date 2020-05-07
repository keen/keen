/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useRef, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Arc, DefaultArcObject } from 'd3-shape';

import { PieLabel } from '../../components';
import { StyledPath } from './pie-slice.styles';

import { createArcTween, animateArcPath, ArcProperties } from '../../utils';

import { ChartContext, ChartContextType } from '../../contexts';

const hoverTransition = { duration: 0.2, ease: 'easeInOut' };

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
  onMouseLeave,
  onMouseMove,
}) => {
  const [arcProperties, setArcProperties] = useState<ArcProperties>({
    startAngle,
    endAngle,
  });
  const element = useRef(null);
  const [isActive, setActive] = useState(false);

  const { theme } = useContext(ChartContext) as ChartContextType;
  const {
    pie: { labels },
  } = theme;

  const [x, y] = activePosition;
  const [labelX, labelY] = labelPosition;

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

  return (
    <motion.g
      variants={sliceVariants}
      initial="hidden"
      animate="show"
      exit="remove"
    >
      <motion.g
        onMouseMove={onMouseMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={e => {
          onMouseLeave(e);
          setActive(false);
        }}
        style={{ originX: '0', originY: '0' }}
        transition={hoverTransition}
        whileHover={{
          x,
          y,
        }}
      >
        <StyledPath
          dropShadow={isActive}
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

/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useRef, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Arc, DefaultArcObject } from 'd3-shape';

import { PieLabel } from '../../components';
import { StyledPath } from './donut-slice.styles';

import { createArcTween, animateArcPath, ArcProperties } from '../../utils/';

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
  id: string;
  onMouseMove: (e: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<SVGGElement, MouseEvent>) => void;
};

const DonutSlice: FC<Props> = ({
  background,
  draw,
  autocolor,
  label,
  startAngle,
  endAngle,
  labelPosition,
  id,
  onMouseLeave,
  onMouseMove,
}) => {
  const [arcProperties, setArcProperties] = useState<ArcProperties>({
    startAngle,
    endAngle,
  });
  const element = useRef(null);
  const path = useRef(null);

  const [isActive, setActive] = useState(false);
  const { theme } = useContext(ChartContext) as ChartContextType;
  const { labels } = theme.donut;
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
      data-testid={id}
    >
      <motion.g
        onMouseMove={onMouseMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={(e) => {
          onMouseLeave(e);
          setActive(false);
        }}
        transition={hoverTransition}
        whileHover={{ scale: 1.05 }}
        style={{ originX: '0', originY: '0' }}
        ref={path}
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

export default DonutSlice;

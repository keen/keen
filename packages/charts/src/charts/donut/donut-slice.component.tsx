/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useRef, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Arc, DefaultArcObject } from 'd3-shape';

import DonutLabel from '../../components/pie-label.component';
import { StyledPath } from './donut-slice.styles';

import { createArcTween, animateArcPath, ArcProperties } from '../../utils/';

import { ChartContext, ChartContextType } from '../../contexts';

const transition = { duration: 0.2, ease: 'easeInOut' };

type Props = {
  draw: Arc<any, DefaultArcObject>;
  drawActive: Arc<any, DefaultArcObject>;
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

const DonutSlice: FC<Props> = ({
  background,
  draw,
  autocolor,
  label,
  startAngle,
  endAngle,
  labelPosition,
  onMouseLeave,
  onMouseMove,
}) => {
  const [arcProperties, setArcProperties] = useState<ArcProperties>({
    startAngle: 0,
    endAngle: 0,
  });
  const element = useRef(null);
  const path = useRef(null);

  const [isActive, setActive] = useState(false);
  const { theme } = useContext(ChartContext) as ChartContextType;
  const { labels } = theme.donut;

  useEffect(() => {
    const shouldAnimate =
      arcProperties.startAngle !== 0 && arcProperties.endAngle !== 0;

    if (shouldAnimate) {
      const motion = createArcTween(
        arcProperties,
        { startAngle, endAngle },
        draw
      );
      animateArcPath(element, motion, () => {
        setArcProperties({
          startAngle,
          endAngle,
        });
      });
    } else {
      setArcProperties({
        startAngle,
        endAngle,
      });
    }
  }, [startAngle, endAngle]);

  return (
    <motion.g
      onMouseMove={onMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={e => {
        onMouseLeave(e);
        setActive(false);
      }}
      transition={transition}
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
        <DonutLabel
          sliceBackground={background}
          autocolor={autocolor}
          position={labelPosition}
          {...labels.typography}
        >
          {label}
        </DonutLabel>
      )}
    </motion.g>
  );
};

export default DonutSlice;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useRef, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Arc, DefaultArcObject } from 'd3-shape';

import PieLabel from '../../components/pie-label.component';
import { StyledPath } from './pie-slice.styles';

import { createArcTween, animateArcPath, ArcProperties } from '../../utils';

import { ChartContext, ChartContextType } from '../../contexts';

const transition = { duration: 0.2, ease: 'easeInOut' };

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
    startAngle: 0,
    endAngle: 0,
  });
  const element = useRef(null);

  const [isActive, setActive] = useState(false);
  const { theme } = useContext(ChartContext) as ChartContextType;
  const { labels } = theme;

  const [x, y] = activePosition;

  useEffect(() => {
    const shouldAnimate =
      arcProperties.startAngle !== 0 && arcProperties.endAngle !== 0;

    if (shouldAnimate) {
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
      style={{ originX: '0', originY: '0' }}
      transition={transition}
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
        <PieLabel
          sliceBackground={background}
          autocolor={autocolor}
          position={labelPosition}
          {...labels.typography}
        >
          {label}
        </PieLabel>
      )}
    </motion.g>
  );
};

export default PieSlice;

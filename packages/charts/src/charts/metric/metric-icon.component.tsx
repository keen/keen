import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Container,
  IconContainer,
  SVGContainer,
  IconPosition,
} from './metric-icon.styles';
import { generateCircles } from './utils';

const SVG_DIMENSION = 450;

const createCircleMotion = (opacity: number) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity,
  },
});

export const createCircleTransition = (index: number) => ({
  delay: 0.1 * index,
  duration: 0.1,
});

type Props = {
  children?: React.ReactNode;
  baseColor: string;
  circleStyle: 'solid' | 'regular';
  position: IconPosition;
};

const MetricIcon: FC<Props> = ({
  children,
  circleStyle,
  position,
  baseColor,
}) => {
  const circles = generateCircles({ color: baseColor, circleStyle });
  const strokeProps =
    circleStyle === 'solid'
      ? {}
      : {
          strokeWidth: 2,
          stroke: baseColor,
        };

  return (
    <Container position={position}>
      <IconContainer>
        {children}
        <SVGContainer>
          <svg
            role="img"
            preserveAspectRatio="xMinYMin"
            width={SVG_DIMENSION}
            height={SVG_DIMENSION}
          >
            <AnimatePresence>
              {circles.map(({ radius, color, opacity }, idx) => (
                <motion.circle
                  key={idx}
                  fill={color}
                  r={radius}
                  {...strokeProps}
                  variants={createCircleMotion(opacity)}
                  transition={createCircleTransition(idx)}
                  exit={{}}
                  initial="hidden"
                  animate="visible"
                  cx="50%"
                  cy="50%"
                />
              ))}
            </AnimatePresence>
          </svg>
        </SVGContainer>
      </IconContainer>
    </Container>
  );
};

export default MetricIcon;

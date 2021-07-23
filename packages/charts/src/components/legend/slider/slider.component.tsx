import React from 'react';
import { MotionProps } from 'framer-motion';

import { Container } from './slider.styles';

import ShiftGroup from './shift-group';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
  /* Slider mode */
  mode: 'vertical' | 'horizontal';
  /** Container width and height */
  dimension: [number, number];
  /** Next slide event handler */
  onNextSlide: () => void;
  /** Previous slide event handler */
  onPreviousSlide: () => void;
  nextDisabled?: boolean;
  previousDisabled?: boolean;
  /* */
  animation: (idx: number) => MotionProps;
};

const LegendSlider = ({
  children,
  dimension,
  animation,
  onNextSlide,
  onPreviousSlide,
  nextDisabled,
  previousDisabled,
}: Props) => {
  const [width, height] = dimension;

  return (
    <Container width={width} height={height}>
      <div
        style={{ position: 'absolute', left: 0, top: 0, zIndex: 9999 }}
        onClick={!previousDisabled && onPreviousSlide}
      >
        {'<'}
      </div>
      <ShiftGroup shiftAnimation={animation}>{children}</ShiftGroup>
      <div
        onClick={!nextDisabled && onNextSlide}
        style={{ position: 'absolute', right: 0, top: 0 }}
      >
        {'>'}
      </div>
    </Container>
  );
};

export default LegendSlider;

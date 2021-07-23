import React from 'react';

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
  onNext: () => void;
  /** Previous slide event handler */
  onPrevious: () => void;
  nextDisabled?: boolean;
  previousDisabled?: boolean;
};

const anim = (idx: number) => ({
  initial: { opacity: 0, x: idx * (65 + 10), y: '-50%' },
  animate: { x: idx * (65 + 10), opacity: 1 },
  exit: { x: '-50%', opacity: 0 },
});

const LegendSlider = ({
  children,
  dimension,
  onNext,
  onPrevious,
  nextDisabled,
  previousDisabled,
}: Props) => {
  const [width, height] = dimension;

  return (
    <Container width={width} height={height}>
      <div
        style={{ position: 'absolute', left: 0, top: 0, zIndex: 9999 }}
        onClick={!previousDisabled && onPrevious}
      >
        {'<'}
      </div>
      <ShiftGroup shiftAnimation={anim}>{children}</ShiftGroup>
      <div
        onClick={!nextDisabled && onNext}
        style={{ position: 'absolute', right: 0, top: 0 }}
      >
        {'>'}
      </div>
    </Container>
  );
};

export default LegendSlider;

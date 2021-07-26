import React from 'react';
import { MotionProps } from 'framer-motion';
import { Icon } from '@keen.io/icons';

import { sliderSettings } from './slider.settings';
import { Container } from './slider.styles';

import { getIconColor } from '../utils';

import SliderButton from '../slider-button';
import ShiftGroup from '../shift-group';

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
  /* Disable next button */
  nextDisabled?: boolean;
  /* Disable previous button */
  previousDisabled?: boolean;
  /* Animation settings */
  animation: (idx: number) => MotionProps;
};

const LegendSlider = ({
  children,
  mode,
  dimension,
  animation,
  onNextSlide,
  onPreviousSlide,
  nextDisabled,
  previousDisabled,
}: Props) => {
  const [width, height] = dimension;
  const { nextButton, previousButton, buttonVariant } = sliderSettings[mode];

  return (
    <Container width={width} height={height}>
      <SliderButton
        variant={buttonVariant}
        disabled={previousDisabled}
        position={previousButton.position}
        shadow={previousButton.shadow}
        gradientTransmition={previousButton.gradient}
        onClick={!previousDisabled && onPreviousSlide}
      >
        <Icon
          type={previousButton.icon}
          width={12}
          height={12}
          fill={getIconColor(previousDisabled)}
        />
      </SliderButton>
      <ShiftGroup shiftAnimation={animation}>{children}</ShiftGroup>
      <SliderButton
        variant={buttonVariant}
        disabled={nextDisabled}
        position={nextButton.position}
        shadow={nextButton.shadow}
        gradientTransmition={previousButton.gradient}
        onClick={!nextDisabled && onNextSlide}
      >
        <Icon
          type={nextButton.icon}
          width={12}
          height={12}
          fill={getIconColor(nextDisabled)}
        />
      </SliderButton>
    </Container>
  );
};

export default LegendSlider;

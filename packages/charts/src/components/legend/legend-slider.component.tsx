import React, { useState, useRef } from 'react';
import Slick from 'react-slick';

import { Caret, Position } from '@keen.io/ui-core';

import {
  Layout,
  Button,
  Wrapper,
  VERTICAL_BUTTON_HEIGHT,
} from './legend-slider.styles';
import { ContentDimension } from './legend.utils';

type Props = {
  children: React.ReactNode;
  contentDimension: ContentDimension;
  mode: 'vertical' | 'horizontal';
};

const sliderSettings: Record<
  'vertical' | 'horizontal',
  {
    slidesPerRow: number;
    buttonVariant: 'vertical' | 'horizontal';
    prevButtonModifier: Position;
    nextButtonModifier: Position;
    offsetAlign: number;
  }
> = {
  vertical: {
    slidesPerRow: 1,
    buttonVariant: 'horizontal',
    prevButtonModifier: 'top',
    nextButtonModifier: 'bottom',
    offsetAlign: 2 * VERTICAL_BUTTON_HEIGHT,
  },
  horizontal: {
    slidesPerRow: 2,
    buttonVariant: 'vertical',
    prevButtonModifier: 'left',
    nextButtonModifier: 'right',
    offsetAlign: 0,
  },
};

const LegendSlider = ({ children, mode, contentDimension }: Props) => {
  const slickRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { offset, scroll } = contentDimension;
  const {
    slidesPerRow,
    buttonVariant,
    offsetAlign,
    prevButtonModifier,
    nextButtonModifier,
  } = sliderSettings[mode];

  const slidesCount = Math.round(React.Children.count(children) / slidesPerRow);
  const slidesToShow = Math.round(
    (offset - offsetAlign) / (scroll / slidesCount)
  );

  const settings = {
    speed: 300,
    slidesToScroll: 1,
    slidesToShow,
    infinite: false,
    arrows: false,
    slidesPerRow,
    vertical: mode === 'vertical',
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };

  return (
    <Layout sliderMode={mode}>
      <Button
        position={prevButtonModifier}
        variant={buttonVariant}
        onClick={() => slickRef.current.slickPrev()}
        disabled={currentSlide === 0}
      >
        <Caret fill="currentcolor" type={prevButtonModifier} />
      </Button>
      <Wrapper sliderMode={mode}>
        <Slick ref={slickRef} {...settings}>
          {children}
        </Slick>
      </Wrapper>
      <Button
        position={nextButtonModifier}
        variant={buttonVariant}
        onClick={() => slickRef.current.slickNext()}
        disabled={currentSlide === slidesCount - slidesToShow}
      >
        <Caret fill="currentcolor" type={nextButtonModifier} />
      </Button>
    </Layout>
  );
};

export default LegendSlider;

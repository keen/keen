import React, { useState, useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { Group } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';

import { Slider, SliderItem, SliderLayout, ScrollMask } from './slider.styles';
import Button from './button.component';

import { sliderSettings } from './slider.settings';
import { getIconColor, getElementOffset } from '../utils';

type Props = {
  children: React.ReactNode;
  slidesPerRow: number;
  mode: 'vertical' | 'horizontal';
  offsetUpdate?: number;
};

const mapChildren = (children: React.ReactNode, chunks: number) => {
  if (chunks > 1)
    return (
      <Group chunks={chunks}>
        {React.Children.map(children, child => (
          <SliderItem>{child}</SliderItem>
        ))}
      </Group>
    );
  return children;
};

const LegendSlider = ({
  children,
  mode,
  slidesPerRow,
  offsetUpdate = 50,
}: Props) => {
  const slider = useRef(null);
  const motionValue = useMotionValue(0);
  const motionScroll = useSpring(motionValue, {
    stiffness: 300,
    damping: 200,
  });

  const {
    buttonVariant,
    nextButton,
    previousButton,
    sliderProperty,
  } = sliderSettings[mode];

  const [{ scroll, maxScroll }, setScroll] = useState<{
    scroll: number;
    maxScroll: number;
  }>({
    scroll: 0,
    maxScroll: 0,
  });

  useEffect(() => {
    const { offset, scroll: offsetScroll } = getElementOffset(
      slider.current,
      mode
    );
    setScroll(state => ({
      ...state,
      maxScroll: offsetScroll - offset,
    }));

    const offsetSubscription = motionScroll.onChange(position => {
      slider.current[sliderProperty] = position;
    });

    return () => {
      offsetSubscription();
    };
  }, []);

  const previousDisabled = scroll <= 0;
  const nextDisabled = scroll >= maxScroll;

  return (
    <SliderLayout mode={mode}>
      <Button
        variant={buttonVariant}
        shadow={previousButton.shadow}
        gradientTransmition={previousButton.gradient}
        position={previousButton.position}
        disabled={previousDisabled}
        onClick={() => {
          const upatePosition = scroll - offsetUpdate;
          if (upatePosition < offsetUpdate) {
            motionScroll.set(0);
          } else {
            motionScroll.set(upatePosition);
          }
        }}
      >
        <Icon
          type={previousButton.icon}
          fill={getIconColor(previousDisabled)}
        />
      </Button>
      <Button
        variant={buttonVariant}
        shadow={nextButton.shadow}
        gradientTransmition={nextButton.gradient}
        position={nextButton.position}
        disabled={nextDisabled}
        onClick={() => {
          motionScroll.set(scroll + offsetUpdate);
        }}
      >
        <Icon type={nextButton.icon} fill={getIconColor(nextDisabled)} />
      </Button>
      <ScrollMask
        ref={slider}
        onScroll={e => {
          e.persist();
          const offset = e.currentTarget[sliderProperty];
          motionScroll.set(offset, false);
          setScroll(state => ({
            ...state,
            scroll: offset,
          }));
        }}
      >
        <Slider mode={mode}>{mapChildren(children, slidesPerRow)}</Slider>
      </ScrollMask>
    </SliderLayout>
  );
};

export default LegendSlider;

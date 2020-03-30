import React from 'react';

import { Layout } from '../../types';

import { TickContainer, Tick, Label } from './slider.styles';

type Props = {
  layout: Layout;
  controlSize: number;
  sliderThickness: number;
  ticks: {
    pos: number;
    val: number;
  }[];
};

export const Ruler = ({
  ticks,
  controlSize = 16,
  layout,
  sliderThickness,
}: Props) => {
  return (
    <>
      {ticks.map((item, idx) => (
        <TickContainer
          key={`${idx}-${item.val}`}
          sliderThickness={sliderThickness}
          type={layout}
          left={item.pos}
          controlSize={controlSize}
        >
          <Tick type={layout} />
          <Label type={layout}>{item.val}</Label>
        </TickContainer>
      ))}
    </>
  );
};

export default Ruler;

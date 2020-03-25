import React from 'react';

import { Layout } from '../../types';

import { TickContainer, Tick, Label } from './slider.styles';

type Props = {
  layout: Layout;
  controlSize: number;
  ticks: {
    pos: number;
    val: number;
  }[];
};

export const Ruler = ({ controlSize = 12, ticks, layout }: Props) => {
  return (
    <>
      {ticks.map(({ pos, val }) => (
        <TickContainer
          key={val}
          type={layout}
          left={pos}
          controlSize={controlSize}
        >
          <Tick type={layout} />
          <Label type={layout}>{val}</Label>
        </TickContainer>
      ))}
    </>
  );
};

export default Ruler;

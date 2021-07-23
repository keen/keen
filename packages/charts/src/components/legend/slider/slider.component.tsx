import React from 'react';

import ShiftGroup from './shift-group';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
  /* Slider mode */
  mode: 'vertical' | 'horizontal';
  /** Container width and height */
  dimension: [number, number];
};

const LegendSlider = ({
  children,
  mode,
}: Props) => {


};

export default LegendSlider;

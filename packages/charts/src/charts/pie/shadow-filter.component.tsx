import React, { FC } from 'react';

import { SHADOW_FILTER_ID } from './constants';

type Props = {
  filterId?: string;
};

const ShadowFilter: FC<Props> = ({ filterId = SHADOW_FILTER_ID }) => (
  <filter
    id={filterId}
    filterUnits="objectBoundingBox"
    x="-50%"
    y="-50%"
    width="200%"
    height="200%"
    pointerEvents="none"
  >
    <feDropShadow
      dx="4"
      dy="10"
      stdDeviation="10"
      floodColor="#1D2729"
      floodOpacity="0.3"
    />
  </filter>
);

export default ShadowFilter;

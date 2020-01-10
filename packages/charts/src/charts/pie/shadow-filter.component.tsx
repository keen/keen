import React, { FC } from 'react';

import { SHADOW_FILTER_ID } from './constants';

type Props = {
  filterId?: string;
};

const ShadowFilter: FC<Props> = ({ filterId = SHADOW_FILTER_ID }) => (
  <filter id={filterId} height="130%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
    <feOffset dx="6" dy="6" result="offsetblur" />
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.11" />
    </feComponentTransfer>
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

export default ShadowFilter;

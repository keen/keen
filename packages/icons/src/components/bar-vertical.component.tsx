import React from 'react';

import { IconProps } from '../types';

const BarVertical = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      fillRule="evenodd"
      d="M99.009901,0 L99.009901,100 L81.1881188,100 L81.1881188,0 L99.009901,0 Z M44.5544554,19.8019802 L44.5544554,100 L26.7326733,100 L26.7326733,19.8019802 L44.5544554,19.8019802 Z M17.8217822,55.4455446 L17.8217822,100 L0,100 L0,55.4455446 L17.8217822,55.4455446 Z M72.2772277,70.2970297 L72.2772277,100 L54.4554455,100 L54.4554455,70.2970297 L72.2772277,70.2970297 Z"
    />
  </svg>
);

export default BarVertical;

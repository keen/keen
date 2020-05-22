import React from 'react';

import { IconProps } from '../types';

const LockClosed = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M75.996 25.07l.004.43V47h12.5l1.5 1.5v50l-1.5 1.5h-77L10 98.5v-50l1.5-1.5H23V26.022C23 11.387 35.55.156 49.742.002c13.775-.15 26.011 10.913 26.254 25.069zM87 50H13v47h74V50zM52 60l1 1v25l-1 1h-5l-1-1V61l1-1h5zM49.796 5.001c-11.462.125-21.591 9.089-21.793 20.67l-.003.351V47h43V25.5c0-11.486-9.987-20.62-21.204-20.499z"
    />
  </svg>
);

export default LockClosed;

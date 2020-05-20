import React from 'react';

import { IconProps } from '../types';

const LockOpen = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M74.496 25.079l.004.422V46.5H86l1.5 1.5v50L86 99.5H10L8.5 98V48l1.5-1.5h59.5v-21c0-11.192-9.977-20.118-21.204-19.999-11.47.122-21.59 8.88-21.793 20.163l-.003.347v6.89h-5V26l.004-.42C21.75 11.43 34.202.65 48.242.502 62.007.355 74.252 11.187 74.496 25.08zM84.5 49.5h-73v47h73v-47zM50 60l1 1v25l-1 1h-4l-1-1V61l1-1h4z"
    />
  </svg>
);

export default LockOpen;

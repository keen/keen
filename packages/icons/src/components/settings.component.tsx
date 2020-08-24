import React from 'react';

import { IconProps } from '../types';

const Settings = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      fillRule="evenodd"
      d="M60 74c5.408 0 10.045 3.302 12.004 8H98a2 2 0 012 2v6a2 2 0 01-2 2H72.003c-1.959 4.698-6.595 8-12.003 8s-10.044-3.302-12.003-8H2a2 2 0 01-2-2v-6a2 2 0 012-2h45.996c1.96-4.698 6.596-8 12.004-8zM29 37c5.408 0 10.045 3.302 12.004 8H98a2 2 0 012 2v6a2 2 0 01-2 2H41.003c-1.959 4.698-6.595 8-12.003 8s-10.044-3.302-12.003-8H2a2 2 0 01-2-2v-6a2 2 0 012-2h14.996c1.96-4.698 6.596-8 12.004-8zM72 0c5.408 0 10.045 3.302 12.004 8H98a2 2 0 012 2v6a2 2 0 01-2 2H84.003c-1.959 4.698-6.595 8-12.003 8s-10.044-3.302-12.003-8H2a2 2 0 01-2-2v-6a2 2 0 012-2h57.996C61.956 3.302 66.592 0 72 0z"
    />
  </svg>
);

export default Settings;

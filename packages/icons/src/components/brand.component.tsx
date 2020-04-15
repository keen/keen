import React from 'react';

import { IconProps } from '../types';

const Brand = ({ width, height, fill }: IconProps) => (
  <svg width={width} height={height} viewBox="0 0 143 120">
    <g fill="none" fillRule="evenodd">
      <g fill={fill}>
        <path d="M57.6 69 64.385 80.349 47.423 108.72 135.485 108.72 142.2 120 27 120z" />
        <path d="M0 120 13.462 120 57.667 45.297 74.599 74.013 88.2 74.013 57.737 22.2z" />
        <path d="M64.2 11.383 108.083 86.278 74.289 86.278 67.518 97.8 128.4 97.8 70.904 0z" />
      </g>
    </g>
  </svg>
);

export default Brand;

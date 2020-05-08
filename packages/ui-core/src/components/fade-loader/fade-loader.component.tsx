import React, { FC } from 'react';
import { colors } from '@keen.io/colors';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export const FadeLoader: FC<Props> = ({
  color = colors.white['500'],
  width = 23,
  height = 18,
}) => (
  <svg width={width} height={height} viewBox="0 0 30 25">
    <path
      fill={color}
      fillRule="evenodd"
      d="M393.901855,24.0625 L395.3282,26.4963137 L391.762338,32.5808479 L410.27571,32.5808479 L411.6875,35 L387.46875,35 L393.901855,24.0625 Z M394.273948,14.6875 L400.75,25.4488032 L397.858576,25.4488032 L394.259048,19.4847074 L384.86192,35 L382,35 L394.273948,14.6875 Z M396.668118,10 L408.5625,30.3125 L395.967607,30.3125 L397.368485,27.9195292 L404.359437,27.9195292 L395.28125,12.3642822 L396.667975,10 L396.668118,10 Z"
      transform="translate(-382 -10)"
    >
      <animate
        id="animation1"
        attributeName="opacity"
        from="0.1"
        to="1"
        dur="1.2s"
        begin="0s;animation2.end"
      />
      <animate
        id="animation2"
        attributeName="opacity"
        from="1"
        to="0.1"
        dur="1.2s"
        begin="animation1.end"
      />
    </path>
  </svg>
);

export default FadeLoader;

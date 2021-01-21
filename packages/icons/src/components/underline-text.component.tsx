import React from 'react';

import { IconProps } from '../types';

const UnderlineText = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M82.6877618,90 L82.6877618,100 L16.5,100 L16.5,90 L82.6877618,90 Z M27.9620248,0 L27.9620248,47.4210526 L27.9639983,47.9944541 C27.9916271,51.9694432 28.3093589,55.1291866 28.9171935,57.4736842 C29.5539727,59.9298246 30.6249195,62.1578947 32.1300338,64.1578947 C33.8281116,66.4385965 36.134024,68.1578947 39.047771,69.3157895 C41.9615181,70.4736842 45.4638034,71.0526316 49.5546271,71.0526316 C53.6840434,71.0526316 57.195977,70.4824561 60.0904277,69.3421053 C62.9848784,68.2017544 65.3004389,66.4736842 67.0371094,64.1578947 C68.5422237,62.1578947 69.6131705,59.8684211 70.2499497,57.2894737 C70.8867288,54.7105263 71.2051184,51.5087719 71.2051184,47.6842105 L71.2051184,47.6842105 L71.2051184,0 L82.6671432,0 L82.6671432,46.8947368 L82.6632584,47.6320267 C82.6062813,53.0085398 81.9225562,57.7189169 80.6120832,61.7631579 C79.2420432,65.9912281 76.9940198,69.5087719 73.868013,72.3157895 C70.896377,74.9824561 67.4230361,76.9298246 63.4479905,78.1578947 C59.4729449,79.3859649 54.8418237,80 49.5546271,80 C44.1516524,80 39.443346,79.3508772 35.4297076,78.0526316 C31.4160693,76.754386 28.0392102,74.8421053 25.2991302,72.3157895 C22.1731234,69.4385965 19.9251,65.9649123 18.55506,61.8947368 C17.18502,57.8245614 16.5,52.8245614 16.5,46.8947368 L16.5,46.8947368 L16.5,0 L27.9620248,0 Z"
    />
  </svg>
);

export default UnderlineText;

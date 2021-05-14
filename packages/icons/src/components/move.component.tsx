import React from 'react';

import { IconProps } from '../types';

const Move = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M66.9629822,56.4247219 L82.672,72.134 L93.1203869,61.6853938 L99.4476348,64.3071851 L99.447,64.619 L99.9943889,64.8461543 L100.000145,96.2937527 L96.2946884,99.9992094 L64.84709,99.9934532 L64.624,99.454 L64.3003358,99.454484 L61.6785446,93.1272361 L72.128,82.678 L56.4187925,66.9689116 L56.4190126,61.3455638 L61.3396345,56.424942 L66.9629822,56.4247219 Z M38.6603655,56.424942 L43.5809874,61.3455638 L43.5812075,66.9689116 L27.872,82.678 L38.3214554,93.1272361 L35.6996642,99.454484 L35.375,99.454 L35.15291,99.9934532 L3.70531163,99.9992094 L-0.000145014348,96.2937527 L0.00561111533,64.8461543 L0.552,64.619 L0.552365236,64.3071851 L6.87961313,61.6853938 L17.328,72.134 L33.0370178,56.4247219 L38.6603655,56.424942 Z M3.70531163,0.000790642822 L35.15291,0.0065467725 L37.7747013,6.33379467 L27.325,16.782 L43.0307947,32.4884603 L43.0305746,38.111808 L38.1099528,43.0324299 L32.486605,43.0326499 L16.78,27.327 L6.33285901,37.775637 L0.00561111533,35.1538457 L-0.000145014347,3.70624729 L3.70531163,0.000790642822 Z M96.2946884,0.000790642822 L100.000145,3.70624729 L99.9943889,35.1538457 L93.667141,37.775637 L83.219,27.327 L67.513395,43.0326499 L61.8900472,43.0324299 L56.9694254,38.111808 L56.9692053,32.4884603 L72.674,16.782 L62.2252987,6.33379467 L64.84709,0.0065467725 L96.2946884,0.000790642822 Z"
      id="move"
    ></path>
  </svg>
);

export default Move;
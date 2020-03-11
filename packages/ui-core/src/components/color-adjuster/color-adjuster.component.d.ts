import React, { FC } from 'react';
declare type Props = {
  children: (color: string) => React.ReactNode;
  baseColor: string;
};
export declare const ColorAdjuster: FC<Props>;
export default ColorAdjuster;

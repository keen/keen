import React, { FC } from 'react';
import { Typography } from '@keen.io/ui-core';
declare type Props = {
  position: [number, number];
  children: React.ReactNode;
  sliceBackground: string;
  autocolor: boolean;
} & Typography;
declare const PieLabel: FC<Props>;
export default PieLabel;

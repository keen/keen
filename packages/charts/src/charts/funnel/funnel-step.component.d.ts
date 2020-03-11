import { FC } from 'react';
import { ScaleLinear } from 'd3-scale';
import { Layout } from '@keen.io/ui-core';
import { Margins, Theme } from '../../types';
declare type Props = {
  scale: ScaleLinear<number, number>;
  theme: Pick<Theme, 'funnel'>;
  index: number;
  label: string;
  layout: Layout;
  value: number | string;
  nextPercentageValue: number;
  percentageValue: number;
  color: string;
  margins: Margins;
  stepsCount: number;
};
export declare const FunnelStep: FC<Props>;
export default FunnelStep;

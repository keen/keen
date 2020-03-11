import { FC } from 'react';
import { Layout } from '@keen.io/ui-core';
import { CommonChartSettings } from '../../types';
export declare type Props = {
  data: Record<string, any>[];
  labelSelector: string;
  layout?: Layout;
  key?: string;
  formatValues?: (value: number) => string | number;
} & CommonChartSettings;
export declare const FunnelChart: FC<Props>;
export default FunnelChart;

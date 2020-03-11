import { FC } from 'react';
import { Theme } from '../../types';
declare type Props = {
  theme: Pick<Theme, 'funnel'>;
  percentageValue: number;
  value: number | string;
  label: string;
  flipBadge?: boolean;
};
export declare const FunnelHeader: FC<Props>;
export default FunnelHeader;

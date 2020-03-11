import { FC } from 'react';
import { Typography } from '@keen.io/ui-core';
declare type Props = {
  text: string;
  typography: Typography;
  markColor: string;
  onClick: (disabled: boolean) => void;
  truncate?: number;
};
declare const LegendLabel: FC<Props>;
export default LegendLabel;

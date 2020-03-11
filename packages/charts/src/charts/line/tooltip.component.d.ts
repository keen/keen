import { FC } from 'react';
import { DataSelector } from '../../types';
declare type Props = {
  data: object[];
  selectors: {
    selector: DataSelector;
    color: string;
  }[];
};
declare const Tooltip: FC<Props>;
export default Tooltip;

import { FC } from 'react';
import { DataSelector, GroupMode, StackMode } from '../../types';
declare type Props = {
  data: object[];
  keys: string[];
  disabledKeys: string[];
  selectors: {
    selector: DataSelector;
    color: string;
  }[];
  groupMode: GroupMode;
  stackMode: StackMode;
  isList: boolean;
};
declare const BarTooltip: FC<Props>;
export default BarTooltip;

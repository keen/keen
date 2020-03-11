import { FC } from 'react';
import { Typography } from '../../types';
declare type Point = {
  color: string;
  value: string;
};
declare type Props = {
  list: Point[];
  typography?: Typography;
};
declare const BulletList: FC<Props>;
export default BulletList;

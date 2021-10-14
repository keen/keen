import { Icons } from './constants';

export type IconProps = {
  width: number;
  height: number;
  fill: string;
  opacity?: number;
};

export type IconType = typeof Icons[number];

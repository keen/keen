import { DataSelector } from '../../types';

export type Bubble = {
  key: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  selector: DataSelector;
};

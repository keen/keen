export type GroupMode = 'grouped' | 'stacked';

export type StackMode = 'normal' | 'percent';

export type Bar = {
  key: string;
  selector: (string | number)[];
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
};

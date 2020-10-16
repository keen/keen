export type DataSelector = (number | string)[];

export type TooltipState = {
  visible: boolean;
  selectors: { selector: DataSelector; color: string }[];
  x: number;
  y: number;
};

export type Controls = {
  number?: 1 | 2;
  size?: number;
  background?: string;
  border?: string;
};

export type OffRangeType = {
  background?: string;
};

export type Interval = {
  minimum: number;
  maximum: number;
  step: number;
};

export type DragConstraints = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export type ControlSettings = {
  count?: number;
  size: number;
  backgroundColor: string;
  borderColor: string;
};

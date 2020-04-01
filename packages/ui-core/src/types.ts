export type Typography = {
  fontStyle: 'normal' | 'italic';
  fontWeight: 'normal' | 'bold';
  fontSize: number;
  fontColor: string;
  fontFamily?: string;
  lineHeight?: string;
};

export type Position = 'top' | 'bottom' | 'left' | 'right';

export type Alignment = 'left' | 'center' | 'right';

export type Layout = 'vertical' | 'horizontal';

export type ColorMode = 'discrete' | 'continuous';

export type RangeType = {
  min?: number;
  max?: number;
};

export type CeilType = string | number | Date;

export type ArrowsType = 'asc' | 'desc';

export type SortByType = {
  property: string;
  sort: ArrowsType;
};

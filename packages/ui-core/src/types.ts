export type Typography = {
  fontStyle: 'normal' | 'italic';
  fontWeight: 'normal' | 'bold' | 'lighter';
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

export type SortMode = 'ascending' | 'descending';

export type SortByType = {
  property: string;
  sort: SortMode;
};

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-normal'
  | 'body-bold'
  | 'number-xl'
  | 'number-l'
  | 'number-m'
  | 'number-s';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'blank';

export type RadioItem = { id: string; label: string; value: string | number };

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

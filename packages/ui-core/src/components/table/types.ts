export type CellValue = string | number | boolean | Date | string[] | number[];

export type CellTextAlignment = 'left' | 'right';

export type TableRowData = {
  value: any;
  alignment: CellTextAlignment;
};

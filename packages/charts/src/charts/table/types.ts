import { CeilType } from '@keen.io/ui-core';

export type HeaderCeilType = {
  key: string;
  value: CeilType;
};

export type FormatType = (value: CeilType) => CeilType;

export type FormatTypeObject = {
  [key: string]: FormatType;
};

export type ValueFormatter = FormatTypeObject | FormatType;

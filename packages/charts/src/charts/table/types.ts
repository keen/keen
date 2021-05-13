import React from 'react';
import { CellTextAlignment } from '@keen.io/ui-core';

export type HeaderCell = {
  key: string;
  value: React.ReactNode;
  align: CellTextAlignment;
};

export type FormatFunction = (value: string | number) => React.ReactNode;

export type ValueFormatter = FormatFunction | Record<string, FormatFunction>;

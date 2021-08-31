import React from 'react';
import { CellTextAlignment } from '@keen.io/ui-core';
import { Formatter } from '@keen.io/charts-utils';

export type HeaderCell = {
  key: string;
  value: React.ReactNode;
  align: CellTextAlignment;
};

export type FormatFunction = (value: string | number) => React.ReactNode;

export type ValueFormatter = Record<string, Formatter>;

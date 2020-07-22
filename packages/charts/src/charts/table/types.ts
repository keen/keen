import React from 'react';

export type HeaderCell = {
  key: string;
  value: React.ReactNode;
};

export type FormatFunction = (value: string | number) => React.ReactNode;

export type ValueFormatter = FormatFunction | Record<string, FormatFunction>;

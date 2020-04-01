import React from 'react';
import { Ceil } from '@keen.io/ui-core';
import { StripedTable } from './table.styles';
import { copyToClipboard } from './table.utils';
import { FormatFuncType } from '../../types';

type Props = {
  data?: any;
  color: string;
  format?: FormatFuncType;
};

export const Row = ({ data, color, format }: Props) => {
  return (
    <StripedTable color={color}>
      {Object.keys(data).map(key => (
        <Ceil
          key={`${key}`}
          onClick={copyToClipboard}
          format={typeof format === 'object' ? format[key] : format}
        >
          {data[key]}
        </Ceil>
      ))}
    </StripedTable>
  );
};

export default Row;

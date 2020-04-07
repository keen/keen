import React from 'react';
import { Ceil, Typography } from '@keen.io/ui-core';
import { StripedTable } from './table.styles';
import { copyToClipboard } from './table.utils';

type Props = {
  data?: Record<string, any>;
  color: string;
  typography: Typography;
};

export const Row = ({ data, color, typography }: Props) => {
  return (
    <StripedTable color={color} typography={typography}>
      {Object.keys(data).map((key: string) => (
        <Ceil key={`${key}`} onClick={copyToClipboard} value={data[key]} />
      ))}
    </StripedTable>
  );
};

export default Row;

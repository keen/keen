import React, { useState } from 'react';
import HeaderRow from './header-row.component';
import Row from './row.component';
import { TableContainer, StyledTable } from './table.styles';
import { sortData } from './table.utils';
import { FormatTypeObject, ValueFormatter } from './types';
import { generateHeader, generateTable } from './table.utils';

import { theme as defaultTheme } from '../../theme';

import { CommonChartSettings } from '../../types';

export type Props = {
  /** Chart data */
  data: Record<string, any>[];
  /** Main color */
  color: string;
  /** Object of functions to format headers separately */
  formatHeader?: FormatTypeObject;
  /** Format function for values, or object of functions to format values separately */
  formatValue?: ValueFormatter;
  /** Return property name and width of resized column */
  onResize?: (res: { property: string; width: number }) => void;
} & CommonChartSettings;

export const TableChart = ({
  data,
  color = '#27566D',
  formatHeader,
  formatValue,
  onResize,
  theme = defaultTheme,
}: Props) => {
  const [sort, setSort] = useState(null);
  const formatData = formatValue ? generateTable(data, formatValue) : data;
  const sortedData = sort ? sortData(formatData, sort) : formatData;

  const {
    table: { header, body },
  } = theme;

  return (
    <TableContainer>
      <StyledTable>
        <HeaderRow
          data={generateHeader(data[0], formatHeader)}
          color={color}
          onClick={setSort}
          sorting={sort && sort}
          onResize={onResize}
          typography={header.typography}
        />
        {sortedData.map((el: any, idx: number) => (
          <Row
            key={`${idx}-${el[0]}`}
            data={el}
            color={color}
            typography={body.typography}
          />
        ))}
      </StyledTable>
    </TableContainer>
  );
};

export default TableChart;

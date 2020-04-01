import React, { useState } from 'react';
import HeaderRow from './header-row.component';
import Row from './row.component';
import { TableContainer, StyledTable } from './table.styles';
import { sortData } from './table.utils';
import { FormatFuncType } from '../../types';
import { firstCapital } from './table.utils';

export type Props = {
  /** Chart data */
  data: any[];
  /** Main color */
  color: string;
  /** Format function for header, or object of functions to format headers separately */
  formatHeader?: FormatFuncType;
  /** Format function for values, or object of functions to format values separately */
  formatValue?: FormatFuncType;
  /** Return property name and width of resized column */
  onResize?: (res: { property: string; width: number }) => void;
};

export const TableChart = ({
  data,
  color = '#27566D',
  formatHeader = firstCapital,
  formatValue,
  onResize,
}: Props) => {
  const [sort, setSort] = useState(null);
  const sortedData = sort ? sortData(data, sort) : data;
  return (
    <TableContainer>
      <StyledTable>
        <HeaderRow
          data={data[0]}
          color={color}
          onClick={res => setSort(res)}
          sorting={sort && sort}
          format={formatHeader}
          onResize={onResize}
        />
        {sortedData.map((el, idx) => (
          <Row
            key={`${idx}-${el[0]}`}
            data={el}
            color={color}
            format={formatValue}
          />
        ))}
      </StyledTable>
    </TableContainer>
  );
};

export default TableChart;

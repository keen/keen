import styled from 'styled-components';
import { Typography } from '@keen.io/ui-core';
import { rgba } from 'polished';
import { Sticky, DragLine, TableCell } from '@keen.io/ui-core';

export const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

export const StyledTable = styled.div`
  border-collapse: collapse;
  cursor: pointer;
  display: table;
  margin: 0;
`;

export const Header = styled.div<{
  color: string;
  typography: Typography;
}>`
  ${props => props.typography}
  color: ${props => props.typography.fontColor};

  display: table-row;
  background: ${props => props.color};

  ${Sticky} {
    padding: 20px 20px 20px 15px;
    margin-left: 5px;

    &:first-child {
      margin-left: 0;
    }

    &:nth-last-child(-n + 3) {
      margin-right: 7px;

      ${DragLine} {
        display: none;
      }
    }
  }
`;

export const StripedTable = styled.div<{
  color: string;
  typography: Typography;
}>`
  ${props => props.typography}
  color: ${props => props.typography.fontColor};

  display: table-row;

  &:first-child {
    display: table-cell;
  }

  &:nth-child(odd) {
    background: ${props => rgba(props.color, 0.05)};
  }

  &:hover {
    background: ${props => rgba(props.color, 0.3)};
    border-left: 8px solid ${props => props.color};
    box-shadow: 0 10px 24px rgba(29, 39, 41, 0.15);

    ${TableCell} {
      border-right: 1px solid #cdcfd3;
    }

    ${TableCell}:last-child {
      border-right: 0;
    }
  }

  ${TableCell} {
    border-right: 1px solid #f2f2f2;
  }

  ${TableCell}:last-child {
    border-right: 0;
  }
`;

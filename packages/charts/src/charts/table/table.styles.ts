import styled from 'styled-components';
import { hexRgb } from './table.utils';

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
}>`
  display: table-row;

  & .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background: ${props => props.color};
    z-index: 1;
    padding: 20px 20px 20px 15px;
    margin-left: 5px;

    &:first-child {
      margin-left: 0;
    }

    & .drag {
      width: 12px;
      background: ${props => props.color};

      & .dragLine {
        width: 3px;
        height: 100%;
        position: absolute;
        left: 4px;
        background: rgba(205, 207, 211, 0.3);
      }
    }

    &:nth-last-child(-n + 3) {
      margin-right: 7px;

      & .dragLine {
        display: none;
      }
    }
  }
`;

export const StripedTable = styled.div<{
  color: string;
}>`
  display: table-row;

  &:first-child {
    display: table-cell;
  }

  &:nth-child(odd) {
    background: ${props => hexRgb(props.color, 0.05)};
  }

  &:hover {
    background: ${props => hexRgb(props.color, 0.3)};
    border-left: 8px solid ${props => props.color};
    box-shadow: 0 10px 24px rgba(29, 39, 41, 0.15);

    & .tableCell {
      border-right: 1px solid #cdcfd3;
    }

    & .tableCell:last-child {
      border-right: 0;
    }
  }

  & .tableCell {
    border-right: 1px solid #f2f2f2;
  }

  & .tableCell:last-child {
    border-right: 0;
  }
`;

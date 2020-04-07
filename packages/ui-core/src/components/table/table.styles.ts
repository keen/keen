import styled, { css } from 'styled-components';

export const Sticky = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background: inherit;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const StyledHeaderCeil = styled.div<{
  width: number;
}>`
  text-align: left;
  white-space: nowrap;

  ${props =>
    props.width &&
    css`
      width: ${props.width}px;
    `}
`;

export const StyledCeil = styled.div<{
  textAlign: string;
}>`
  padding: 12px 20px;
  position: relative;
  text-align: ${props => props.textAlign};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
`;

export const UpArrow = styled.div<{
  opacity: number;
}>`
  opacity: ${props => props.opacity};
`;

export const DownArrow = styled.div<{
  opacity: number;
}>`
  opacity: ${props => props.opacity};
  position: relative;
  top: 5px;
  left: -1px;
`;

export const DragLine = styled.div`
  width: 3px;
  height: 100%;
  position: absolute;
  left: 5px;
  background: rgba(205, 207, 211, 0.3);
`;

export const TableCell = styled.div`
  display: table-cell;
`;

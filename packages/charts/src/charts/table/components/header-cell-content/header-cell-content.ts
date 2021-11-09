import styled, { css } from 'styled-components';
import { CellTextAlignment } from '../../types';

export const HeaderCellContent = styled.div<{
  textAlignment?: CellTextAlignment;
}>`
  display: flex;
  align-items: center;
  gap: 5px;
  box-sizing: border-box;
  padding: 15px 20px;

  ${(props) =>
    props.textAlignment == 'left' &&
    css`
      flex-direction: row;
    `};

  ${(props) =>
    props.textAlignment == 'center' &&
    css`
      justify-content: center;
    `};

  ${(props) =>
    props.textAlignment == 'right' &&
    css`
      flex-direction: row-reverse;
    `};
`;

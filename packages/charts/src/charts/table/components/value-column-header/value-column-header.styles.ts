import styled from 'styled-components';
import { CellTextAlignment } from '../../types';

export const Container = styled.div<{
  textAlignment: CellTextAlignment;
}>`
  display: flex;
  text-align: left;
  background: inherit;
  justify-content: ${(props) =>
    props.textAlignment === 'left' ? 'flex-start' : 'flex-end'};
`;

export const CellContent = styled.div<{ textAlignment: CellTextAlignment }>`
  display: flex;
  align-items: center;
  gap: 5px;
  box-sizing: border-box;
  padding: 15px 20px;
  flex-direction: ${({ textAlignment }) =>
    textAlignment === 'left' ? 'row' : 'row-reverse'};
`;

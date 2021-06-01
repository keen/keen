import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const StyledColorPalette = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
`;

export const SortableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
`;

export const AddColorButton = styled.div`
  width: 70px;
  height: 37px;
  position: relative;
  cursor: pointer;
  border: 1px solid ${colors.gray[300]};
  background-color: ${colors.gray[200]};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
`;

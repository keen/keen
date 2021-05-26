import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const StyledColorPalette = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SortableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
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

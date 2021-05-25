import styled from 'styled-components';
import { UI_LAYERS } from '../../../../constants';

export const Container = styled.div`
  width: 66px;
  cursor: pointer;
`;

export const ColorIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Bar = styled.div`
  margin-top: 2px;
  width: 20px;
  height: 4px;
`;

export const CaretDown = styled.div`
  margin-left: 10px;
`;

export const DropdownContainer = styled.div`
  width: 280px;
  z-index: ${UI_LAYERS.dropdown};
`;

export const ColorTone = styled.div``;

export const Grid = styled.div`
  display: flex;
  padding: 10px;

  ${ColorTone} + ${ColorTone} {
    margin-left: 4px;
  }
`;

export const Square = styled.div`
  margin-top: 4px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

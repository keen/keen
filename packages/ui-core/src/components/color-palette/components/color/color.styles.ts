import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const StyledColor = styled.div<{
  color: string;
}>`
  background-color: ${(props) => props.color};
  width: 70px;
  height: 37px;
  position: relative;
  box-shadow: 0 2px 4px 0 ${transparentize(0.85, colors.black[500])};
`;

export const DragHandle = styled.div`
  position: absolute;
  height: 100%;
  width: 18px;
  justify-content: center;
  cursor: grab;
  display: flex;
  align-items: center;
  background: ${transparentize(0.4, colors.white[400])};
`;

export const DeleteButton = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 2px;
  cursor: pointer;
  background: ${transparentize(0.4, colors.white[400])};
`;

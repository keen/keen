import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const TextOption = styled.div<{ isActive?: boolean }>`
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  height: 37px;
  background: ${colors.white[500]};
  border-radius: 4px;
  box-sizing: border-box;

  cursor: pointer;

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.85, colors.blue[500])};
    `}
`;

export const PickerContainer = styled.div`
  margin: 0 5px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

export const Separator = styled.div`
  margin: 0 8px;
  width: 1px;
  height: 33px;
  background: ${transparentize(0.5, colors.black[100])};
`;

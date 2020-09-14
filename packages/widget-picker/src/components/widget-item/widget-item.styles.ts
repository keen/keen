import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div<{ isActive?: boolean }>`
  background: ${transparentize(0.9, colors.white[500])};
  border: solid 1px ${colors.gray[300]};
  border-radius: 2px;

  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  ${props =>
    props.isActive &&
    css`
      background: ${transparentize(0.7, colors.blue[100])};
    `}

  &:hover {
    background: ${transparentize(0.7, colors.blue[100])};
  }

  transition: background 0.2s linear;
`;

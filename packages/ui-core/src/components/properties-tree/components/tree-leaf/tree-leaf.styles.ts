import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { ELEMENT_HEIGHT } from '../../constants';

export const Container = styled.div<{
  isActive?: boolean;
}>`
  position: relative;
  display: flex;
  height: ${ELEMENT_HEIGHT}px;

  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  box-sizing: border-box;

  cursor: pointer;
  transition: background 0.2s linear;

  &:hover {
    background: ${transparentize(0.8, colors.green[100])};
  }

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.8, colors.green[100])};
    `};
`;

export const Type = styled.div`
  padding-left: 5px;
  margin-left: auto;
  flex-shrink: 0;
`;

import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  background: ${transparentize(0.85, colors.blue[100])};
  border-radius: 4px;
  height: 37px;
`;

export const Divider = styled.div`
  width: 1px;
  background: ${transparentize(0.7, colors.blue[500])};
  flex-shrink: 0;
`;

export const Item = styled.div<{
  isActive?: boolean;
}>`
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;

  cursor: pointer;

  transition: all 0.2s ease-in;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.5, colors.blue[100])};
    `};
`;

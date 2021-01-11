import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${transparentize(0.85, colors.blue[100])};
  border-radius: 4px;
  height: 37px;
`;

export const Item = styled.div<{
  isActive?: boolean;
}>`
  height: 35px;
  padding: 0 15px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;

  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.blue[500]};
  cursor: pointer;

  transition: all 0.2s ease-in;

  ${(props) =>
    props.isActive &&
    css`
      box-shadow: 0 2px 4px 0 ${transparentize(0.85, colors.black[500])};
      background: ${transparentize(0.08, colors.green[100])};
    `}
`;

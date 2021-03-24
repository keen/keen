import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
`;

export const SelectContainer = styled.div`
  position: relative;
  flex-grow: 1;
  margin-left: 10px;
`;

export const ListItem = styled.div<{
  isActive?: boolean;
}>`
  padding: 9px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 14px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: ${colors.blue[500]};

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

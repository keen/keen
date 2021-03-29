import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const ListItem = styled.div<{
  isActive?: boolean;
}>`
  padding: 7px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;

  font-size: 13px;
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

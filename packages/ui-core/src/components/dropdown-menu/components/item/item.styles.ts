import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 5px 15px;

  color: ${colors.blue[500]};
  font-family: 'Lato regular', sans-serif;
  font-size: 14px;

  cursor: pointer;
  transition: background 0.2s linear;

  &:hover {
    background: ${transparentize(0.8, colors.green[100])};
  }
`;

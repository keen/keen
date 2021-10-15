import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 15px;
  background-color: ${colors.white[500]};
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  border-top: 1px solid ${transparentize(0.5, colors.gray[400])};
`;

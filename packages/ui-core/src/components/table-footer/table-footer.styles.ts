import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 15px;
  background-color: ${colors.white[500]};
  border-top: 1px solid ${transparentize(0.5, colors.gray[400])};
  display: flex;
  align-items: center;
  gap: 15px 10px;
`;

export const PaginationContainer = styled.div`
  margin: auto;
`;

import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div<{ isMobileView: boolean }>`
  padding: 10px 20px;
  background-color: ${colors.white[500]};
  border-top: 1px solid ${transparentize(0.5, colors.gray[400])};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px 10px;

  ${({ isMobileView }) =>
    isMobileView &&
    css`
      flex-wrap: wrap;
      justify-content: center;
    `};
`;

export const PaginationContainer = styled.div<{ isMobileView: boolean }>`
  margin: auto;

  ${({ isMobileView }) =>
    isMobileView &&
    css`
      display: flex;
      width: 100%;
      justify-content: center;
      order: -1;
    `};
`;
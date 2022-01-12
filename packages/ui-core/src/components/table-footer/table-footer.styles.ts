import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

const SUB_CONTAINER_WIDTH = 120;

export const Container = styled.div<{ isCompactView: boolean }>`
  padding: 10px 20px;
  background-color: ${colors.white[500]};
  border-top: 1px solid ${transparentize(0.5, colors.gray[400])};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px 10px;

  ${({ isCompactView }) =>
    isCompactView &&
    css`
      flex-wrap: wrap;
      justify-content: center;
    `};
`;

export const PaginationContainer = styled.div<{ isCompactView: boolean }>`
  margin: auto;

  ${({ isCompactView }) =>
    isCompactView &&
    css`
      display: flex;
      width: 100%;
      justify-content: center;
      order: -1;
    `};
`;

export const RowsContainer = styled.div<{ isCompactView: boolean }>`
  width: ${({ isCompactView }) =>
    isCompactView ? 'auto' : `${SUB_CONTAINER_WIDTH}px`};
  flex-shrink: 0;
`;

export const PerPageContainer = styled.div<{ isCompactView: boolean }>`
  width: ${({ isCompactView }) =>
    isCompactView ? 'auto' : `${SUB_CONTAINER_WIDTH}px`};
  display: flex;
  justify-content: flex-end;
`;

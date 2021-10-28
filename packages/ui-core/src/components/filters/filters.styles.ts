import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;
`;

export const DropdownContent = styled.div`
  padding: 10px 0 0 0;
  width: 200px;
  box-sizing: border-box;
`;

export const FiltersContainer = styled.div<{
  overflowTop: boolean;
  overflowBottom: boolean;
}>`
  max-height: 200px;
  overflow-y: auto;
  ${({ overflowTop, overflowBottom }) => {
    let boxShadow = ``;
    if (overflowTop)
      boxShadow += `inset 0px 6px 4px -4px ${transparentize(
        0.85,
        colors.black[500]
      )}`;
    if (overflowTop && overflowBottom) boxShadow += ',';
    if (overflowBottom)
      boxShadow += `inset 0 -6px 4px -4px ${transparentize(
        0.85,
        colors.black[500]
      )}`;
    return css`
      box-shadow: ${boxShadow};
    `;
  }};
`;

export const ClearFilters = styled.div<{ enableBorder: boolean }>`
  padding: 10px 14px;
  border-top: solid 1px
    ${({ enableBorder }) => (enableBorder ? colors.gray[300] : 'transparent')};
  cursor: pointer;
`;

export const EmptySearch = styled.div`
  padding: 10px 14px;
  text-align: center;
`;

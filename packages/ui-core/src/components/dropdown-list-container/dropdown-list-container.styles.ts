import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div<{
  overflowTop: boolean;
  overflowBottom: boolean;
}>`
  max-height: 100px;
  overflow-y: scroll;

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

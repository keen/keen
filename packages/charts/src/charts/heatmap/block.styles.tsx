import styled, { css } from 'styled-components';

import { SHADOW_FILTER_ID } from './constants';

export const StyledRect = styled.rect<{
  dropShadow: boolean;
}>`
  ${props =>
    props.dropShadow &&
    css`
      filter: url(#${SHADOW_FILTER_ID});
    `}
`;

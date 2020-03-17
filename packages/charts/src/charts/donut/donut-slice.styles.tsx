import styled, { css } from 'styled-components';

import { SHADOW_FILTER_ID } from '../../constants';

export const StyledPath = styled.path<{
  dropShadow: boolean;
}>`
  ${props =>
    props.dropShadow &&
    css`
      filter: url(#${SHADOW_FILTER_ID});
    `}
`;

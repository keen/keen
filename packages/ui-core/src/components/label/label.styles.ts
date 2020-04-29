import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

export const StyledLabel = styled.label<{
  hasError: boolean;
  disabled: boolean;
}>`
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: ${colors.blue[500]};

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};

  ${props =>
    props.hasError &&
    css`
      color: ${colors.orange[300]};
    `}
`;

import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

const FakeInput = styled.div<{
  hasError?: boolean;
}>`
  height: 42px;
  border-bottom: solid 1px ${colors.blue['400']};
  box-sizing: border-box;

  ${props =>
    props.hasError &&
    css`
      border-bottom: solid 2px ${colors.red[500]};
    `}
`;

export default FakeInput;

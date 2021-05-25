import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

const Option = styled.div<{ isActive?: boolean }>`
  padding: 5px 14px;
  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  cursor: pointer;
  color: ${colors.black[100]};

  &:hover {
    background: ${transparentize(0.8, colors.green[100])};
  }

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.8, colors.green[100])};
    `}
`;

export default Option;

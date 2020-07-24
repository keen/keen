import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

type Props = {
  isDisabled: boolean;
};

export const StyledButton = styled.button<Props>`
  display: flex;
  text-decoration: none;

  border-radius: 50%;
  padding: 0;
  width: 37px;
  height: 37px;

  background-color: ${colors.blue['500']};
  border-color: ${colors.blue['500']};
  color: ${colors.white['500']};
  boxshadow: 0 2px 4px 0 ${transparentize(0.85, colors.black['500'])};

  outline: none;
  border: none;
  cursor: pointer;

  align-items: center;
  justify-content: center;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.85;
      pointer-events: none;
    `}

  &:hover {
    text-decoration: none;
    box-shadow: 'none';
    background-color: ${colors.blue['400']};
  }
`;

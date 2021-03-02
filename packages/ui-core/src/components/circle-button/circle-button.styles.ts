import styled, { css } from 'styled-components';
import { variant } from 'styled-system';

import { solidButtonVariants } from '../../theme';

import { ButtonVariant } from '../../types';

type Props = {
  isDisabled: boolean;
  variant?: ButtonVariant;
};

export const StyledButton = styled.button<Props>`
  display: flex;
  text-decoration: none;

  border-radius: 50%;
  padding: 0;
  width: 37px;
  height: 37px;

  outline: none;
  border: none;
  cursor: pointer;

  align-items: center;
  justify-content: center;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.85;
      pointer-events: none;
    `};

  &:hover {
    text-decoration: none;
  }

  ${variant(solidButtonVariants)};
`;

export const IconSocket = styled.div`
  display: flex;
  align-items: center;
`;

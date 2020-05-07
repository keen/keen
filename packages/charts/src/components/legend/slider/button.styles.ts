import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Position } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { Variant } from './types';

export const VERTICAL_BUTTON_HEIGHT = 34;

const getPosition = (position: Position) => css`
  ${position}: 0;
`;

export const getDimension = (variant: Variant) =>
  variant === 'vertical'
    ? css`
        width: 34px;
        height: 100%;

        top: 50%;
        transform: translateY(-50%);
      `
    : css`
        width: 100%;
        height: ${VERTICAL_BUTTON_HEIGHT}px;

        left: 50%;
        transform: translateX(-50%);
      `;

export const Gradient = styled(motion.div)<{
  transmition: string;
  variant: Variant;
}>`
  position: absolute;
  top: 0;
  ${props => getDimension(props.variant)}
  background-image: linear-gradient(
    ${props => props.transmition},
    ${colors.white['400']},
    ${colors.white['500']}
  );
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const Block = styled.div<{
  position: Position;
  disabled: boolean;
  variant: Variant;
  shadow: string;
}>`
  position: absolute;
  ${props => getPosition(props.position)}

  background: ${colors.white['500']};

  display: flex;
  justify-content: center;
  align-items: center;
  ${props => getDimension(props.variant)}
  ${props =>
    !props.disabled &&
    css`
      cursor: pointer;
      box-shadow: ${props.shadow};
    `}

   transition: background .2s linear;
  }
`;

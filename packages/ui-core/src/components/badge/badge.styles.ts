import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { motion } from 'framer-motion';

import { Variant } from './types';
import { createVariants } from './utils';
import { UI_LAYERS } from '../../constants';

export const Container = styled.div<{
  pointer: boolean;
}>`
  display: inline-flex;
  align-items: stretch;
  justify-content: center;
  position: relative;
  ${(props) =>
    props.pointer &&
    css`
      cursor: pointer;
    `}
`;

type TextWrapperProps = {
  removable?: boolean;
  variant: Variant;
  isActive: boolean;
};

export const TextWrapper = styled.span<TextWrapperProps>`
  display: block;
  padding: 2px 4px;

  font-family: 'Lato Bold', sans-serif;
  font-size: 13px;
  line-height: 16px;
  white-space: nowrap;

  border-radius: ${(props) => (props.removable ? '2px 0 0 2px' : '2px')};

  transition: background-color 0.3s ease-in-out;

  ${(props) => variant(createVariants(props.isActive))};
`;

type IconWrapperProps = {
  variant: Variant;
  isActive: boolean;
};

export const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2px 4px;
  margin-left: 1px;

  border-radius: 0 2px 2px 0;

  transition: background-color 0.3s ease-in-out;

  ${(props) => variant(createVariants(props.isActive))};
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%) translateY(50%);
  min-width: 170px;
  z-index: ${UI_LAYERS.tooltip};
`;

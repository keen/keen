import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

import { UI_LAYERS } from '../../constants';

import { DropdownPosition } from './types';

export const Container = styled.div<{ isDisabled: boolean }>`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.5;
    `};
`;

export const SelectContainer = styled.div`
  position: relative;
`;

export const CustomDropdown = styled(motion.div)<{
  position: DropdownPosition;
}>`
  width: 100%;
  min-width: 310px;
  position: absolute;
  right: 0;
  background: ${colors.white[500]};
  border: solid 1px ${colors.gray[200]};
  box-shadow: 0 10px 24px 0 rgba(29, 39, 41, 0.15);
  z-index: ${UI_LAYERS.dropdown};

  ${(props) =>
    props.position === 'bottom'
      ? css`
          top: 100%;
        `
      : css`
          bottom: 100%;
        `};
`;

export const DropableContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  flex: 1;
  min-width: 0;
`;

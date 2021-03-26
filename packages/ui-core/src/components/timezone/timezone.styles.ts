import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
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

export const ListItem = styled.div<{
  isActive?: boolean;
}>`
  padding: 7px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;

  font-size: 13px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: ${colors.blue[500]};

  cursor: pointer;
  transition: background 0.2s linear;

  &:hover {
    background: ${transparentize(0.8, colors.green[100])};
  }

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.8, colors.green[100])};
    `};
`;

export const Offset = styled.div`
  color: ${colors.blue[200]};
  font-size: 12px;
  line-height: 15px;
`;

export const Name = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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

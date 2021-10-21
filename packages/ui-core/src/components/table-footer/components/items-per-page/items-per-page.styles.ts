import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Label = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  padding: 5px 10px;
  background-color: ${transparentize(0.85, colors.blue[100])};
  border-radius: 4px;
  cursor: pointer;

  ${({ isOpen }) =>
    isOpen &&
    css`
      box-shadow: 0px 0px 3px 1px ${transparentize(0.85, colors.black[500])};
    `};
`;

export const IconContainer = styled(motion.div)`
  display: flex;
`;

export const Container = styled.div`
  position: relative;

  &:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }
`;

export const List = styled(motion.ul)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: ${colors.white[500]};
  box-shadow: 0px 10px 24px 0px ${transparentize(0.85, colors.black[500])};
`;

export const ListItem = styled(motion.li)<{ isActive: boolean }>`
  padding: 10px;
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${transparentize(0.85, colors.blue[100])};
    `};
`;

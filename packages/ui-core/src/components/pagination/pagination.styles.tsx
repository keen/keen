import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  gap: 5px;
`;

export const PageNumber = styled(motion.div)<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 1rem;
  color: ${colors.blue[500]};
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  line-height: 1;
  min-width: 27px;
  height: 27px;
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 150ms ease-in-out;

  &:hover {
    background-color: ${transparentize(0.9, colors.blue[500])};
  }

  &:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${colors.blue[500]};
      color: ${colors.white[500]};

      &:hover {
        background-color: ${colors.blue[500]};
      }
    `};
`;

export const IconContainer = styled.div<{ isDisabled: boolean }>`
  display: flex;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};

  &:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }
`;

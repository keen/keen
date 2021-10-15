import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
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
  padding: 3px;
  border-radius: 4px;
  color: ${colors.blue[500]};
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  line-height: 1;
  min-width: 15px;
  cursor: pointer;

  &:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${colors.blue[500]};
      color: ${colors.white[500]};
    `};
`;

export const IconContainer = styled.div`
  display: flex;
  cursor: pointer;

  &:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }
`;

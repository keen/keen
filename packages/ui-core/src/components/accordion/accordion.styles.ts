import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const TitleContainer = styled(motion.div)`
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${transparentize(0.8, colors.green[100])};

  display: flex;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;
`;

export const IconContainer = styled(motion.div)`
  flex-shrink: 0;
  display: flex;
  transform-origin: 50% 50%;
`;

export const ContentContainer = styled(motion.div)`
  will-change: height;
  overflow: hidden;
`;

export const Content = styled.div<{ maxHeight?: number }>`
  margin: 15px 10px 10px 10px;

  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight}px;
      overflow: scroll;
    `};
`;

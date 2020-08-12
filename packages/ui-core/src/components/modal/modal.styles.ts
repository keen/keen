import styled from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const FadeMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: ${transparentize(0.7, colors.black['500'])};
`;

export const MotionContainer = styled(motion.div)<{
  scrollY: number;
}>`
  position: absolute;
  left: 50%;
  top: ${props => 60 + props.scrollY}px;

  display: flex;
  flex-direction: column;
`;

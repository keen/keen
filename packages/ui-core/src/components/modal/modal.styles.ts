import styled from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Close = styled.div`
  align-self: flex-end;
  cursor: pointer;
  margin-left: 20px;
`;

export const FadeMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: ${transparentize(0.7, colors.black['500'])};
`;

export const MotionContainer = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 60px;

  display: flex;
  flex-direction: column;
`;

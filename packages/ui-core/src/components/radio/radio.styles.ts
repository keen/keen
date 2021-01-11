import styled from 'styled-components';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  border-radius: 8.5px;
  border: solid 1px ${transparentize(0.8, colors.blue[500])};
  background: ${transparentize(0.95, colors.blue[100])};
  width: 17px;
  height: 17px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ActiveDot = styled(motion.div)`
  height: 9px;
  width: 9px;
  border-radius: 50%;
  background: ${colors.green[300]};
`;

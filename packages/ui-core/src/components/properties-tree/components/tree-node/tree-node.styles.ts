import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

import { ELEMENT_HEIGHT } from '../../constants';

export const Header = styled.div`
  height: ${ELEMENT_HEIGHT}px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }
`;

export const MotionIcon = styled(motion.div)`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-left: 4px;
`;

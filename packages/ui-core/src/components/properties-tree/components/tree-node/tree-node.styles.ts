import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ELEMENT_HEIGHT } from '../../constants';

export const Header = styled.div`
  height: ${ELEMENT_HEIGHT}px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const MotionIcon = styled(motion.div)`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-left: 4px;
`;

import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
`;

export const DownArrow = styled(motion.div)`
  position: relative;
  top: 5px;
  left: -1px;
`;

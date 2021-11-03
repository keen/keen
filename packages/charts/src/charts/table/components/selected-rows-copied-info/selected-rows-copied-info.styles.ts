import styled from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const SelectedRowsCopiedWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 120px;
`;

export const SelectedRowsCopiedBox = styled(motion.div)`
  background: ${colors.white[500]};
  height: 47px;
  z-index: 1;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 24px ${transparentize(0.75, colors.black[500])};
`;

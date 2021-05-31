import styled from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { UI_LAYERS } from '../../constants';

export const FadeMask = styled.div<{ isMaskTransparent: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${UI_LAYERS.modal - 5};
  background: ${(props) =>
    props.isMaskTransparent
      ? 'transparent'
      : transparentize(0.7, colors.black['500'])};
`;

export const MotionContainer = styled(motion.div)<{
  scrollY: number;
}>`
  position: absolute;
  left: 50%;
  top: ${(props) => 60 + props.scrollY}px;
  z-index: ${UI_LAYERS.modal};

  display: flex;
  flex-direction: column;
`;

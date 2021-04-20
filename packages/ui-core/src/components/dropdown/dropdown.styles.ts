import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

import { UI_LAYERS } from '../../constants';

export const Wrapper = styled.div<{
  isRelative?: boolean;
}>`
  ${(props) =>
    props.isRelative &&
    css`
      position: relative;
    `};
`;

export const Container = styled(motion.div)<{
  fullWidth: boolean;
}>`
  position: absolute;
  background: ${colors.white[500]};
  border: solid 1px ${colors.gray[200]};
  box-shadow: 0 10px 24px 0 rgba(29, 39, 41, 0.15);
  z-index: ${UI_LAYERS.dropdown};
  will-change: top;

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `};
`;

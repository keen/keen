import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const IconSocket = styled(motion.div)`
  position: absolute;
  bottom: -3px;
`;

export const StyledCheckbox = styled.div<{
  checked: boolean;
}>`
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: solid 1px ${colors.blue['500']};
  border-radius: 2px;
`;

export const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

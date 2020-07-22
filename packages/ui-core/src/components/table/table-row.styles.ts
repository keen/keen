import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { rgba } from 'polished';

export const Container = styled(motion.tr)<{
  mainColor: string;
  isColumnDragged: boolean;
}>`
  position: relative;

  &:nth-child(odd) {
    background: ${props => rgba(props.mainColor, 0.05)};
  }

  ${props =>
    !props.isColumnDragged &&
    css`
      &:hover {
        box-shadow: 0 10px 24px rgba(29, 39, 41, 0.15);
      }
    `}
`;

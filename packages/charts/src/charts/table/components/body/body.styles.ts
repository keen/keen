import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { rgba } from 'polished';

export const RowContainer = styled(motion.tr)<{
  mainColor: string;
  enableHover?: boolean;
  disableValuesSelection?: boolean;
  width?: string | number;
}>`
  position: relative;

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};

  &:nth-child(odd) {
    background: ${(props) => rgba(props.mainColor, 0.05)};
  }

  ${({ disableValuesSelection }) =>
    disableValuesSelection &&
    css`
      user-select: none;
    `};

  ${({ enableHover, mainColor }) =>
    enableHover &&
    css`
      &:hover {
        box-shadow: 0 10px 24px rgba(29, 39, 41, 0.15);
        td:first-of-type:before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          background-color: ${mainColor};
        }
      }
    `};
`;

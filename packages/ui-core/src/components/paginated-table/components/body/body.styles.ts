import styled from 'styled-components';
import { motion } from 'framer-motion';
import { rgba } from 'polished';

export const RowContainer = styled(motion.tr)<{
  mainColor: string;
}>`
  position: relative;
  //padding-right: 40px;

  &:nth-child(odd) {
    background: ${(props) => rgba(props.mainColor, 0.05)};
  }

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
      background-color: ${(props) => props.mainColor};
    }
  }
`;

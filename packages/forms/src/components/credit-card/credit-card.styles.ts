import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const FieldItem = styled.div`
  position: relative;
  flex-basis: 50%;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translateX(-50%) translateY(-100%);
`;

export const TooltipContent = styled.div`
  display: flex;
`;

export const CreditCardInfo = styled.div`
  font-size: 12px;
  line-height: 15px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.black['500']};
  width: 100px;

  img {
    margin-bottom: 10px;
  }

  & + & {
    margin-left: 10px;
    padding-left: 10px;
    border-left: solid 1px ${colors.gray['500']};
  }
`;

export const Socket = styled.div`
  position: absolute;
  right: 16px;
  top: 31px;
  cursor: pointer;
`;

export const Separator = styled.div`
  width: 30px;
`;

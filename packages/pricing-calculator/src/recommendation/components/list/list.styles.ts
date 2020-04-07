import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const List = styled.div<{
  type?: 'primary' | 'secondary';
}>`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 25px;

  ${props =>
    props.type === 'primary' &&
    css`
      color: ${colors.white['500']};
    `}

  ${props =>
    props.type === 'secondary' &&
    css`
      color: ${colors.blue['500']};
    `}
`;

List.defaultProps = {
  type: 'primary',
};

export const ListTitle = styled.div`
  font-family: 'Lato Bold', sans-serif;
`;

export const ListItem = styled(motion.div)``;

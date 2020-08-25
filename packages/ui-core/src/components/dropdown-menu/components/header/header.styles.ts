import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 5px 15px;
  color: ${transparentize(0.4, colors.blue[500])};
`;

import styled from 'styled-components';
import { colors } from '@keen.io/colors';
import { transparentize } from 'polished';

const OptionHeader = styled.div`
  padding: 0 14px;
  display: flex;
  align-items: center;
  height: 37px;
  background: ${transparentize(0.85, colors.blue[500])};
  border-radius: 4px;
  box-sizing: border-box;
`;

export default OptionHeader;

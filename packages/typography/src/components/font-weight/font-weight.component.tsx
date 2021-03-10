import styled, { css } from 'styled-components';

import { FontWeight as FontWeightType } from '../../types';

type Props = {
  /**  Font weight */
  fontWeight: FontWeightType;
};

const FontWeight = styled.span<Props>`
  ${(props) =>
    props.fontWeight &&
    css`
      font-weight: ${props.fontWeight};
    `};
`;

export default FontWeight;

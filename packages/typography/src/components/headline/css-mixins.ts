import { css } from 'styled-components';

import { DEFAULT_LINE_HEIGHT } from '../../constants';
import { RESET_SPACING } from '../../css-mixins';

export const HEADER_STYLE = css`
  ${RESET_SPACING};
  font-family: 'Gangster Grotesk', sans-serif;

  font-weight: bold;
  line-height: ${DEFAULT_LINE_HEIGHT};
`;

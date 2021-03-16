import { css } from 'styled-components';

import { DEFAULT_LINE_HEIGHT, SHARED_STYLE } from '../../constants';

export const HEADER_STYLE = css`
  ${SHARED_STYLE};
  font-family: 'Gangster Grotesk', sans-serif;

  font-weight: bold;
  line-height: ${DEFAULT_LINE_HEIGHT};
`;

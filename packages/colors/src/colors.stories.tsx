import * as React from 'react';
import styled from 'styled-components';

import { colors } from './colors';

export default {
  title: 'Colors',
  parameters: {
    componentSubtitle: 'Primary colors and shades',
  },
};

const Color = styled.div<{ background: string }>`
  width: 80px;
  height: 80px;
  background: ${props => props.background};

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
`;

const Grid = styled.div`
  display: flex;
`;

export const palette = () => {
  const colorNames = Object.keys(colors);

  return (
    <Grid>
      {colorNames.map(name => {
        const saturationLevels = Object.keys(colors[name]);
        const palette = saturationLevels.map(saturation => (
          <Color key={saturation} background={colors[name][saturation]}>
            {name}
            {saturation}
          </Color>
        ));

        return <div key={name}>{palette}</div>;
      })}
    </Grid>
  );
};

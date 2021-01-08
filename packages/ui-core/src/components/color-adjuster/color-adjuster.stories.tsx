import * as React from 'react';
import styled from 'styled-components';

import { colors } from '@keen.io/colors';

import ColorAdjuster from './color-adjuster.component';

export default {
  title: 'Components /Color Adjuster',
  parameters: {
    component: ColorAdjuster,
    componentSubtitle: 'Adjust color based on HSL lightness property',
  },
};

const ColorCard = styled.div<{ background: string }>`
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
          <ColorCard key={saturation} background={colors[name][saturation]}>
            <ColorAdjuster baseColor={colors[name][saturation]}>
              {adjustedColor => (
                <div style={{ color: adjustedColor }}>
                  {name}
                  {saturation}
                </div>
              )}
            </ColorAdjuster>
          </ColorCard>
        ));

        return <div key={name}>{palette}</div>;
      })}
    </Grid>
  );
};

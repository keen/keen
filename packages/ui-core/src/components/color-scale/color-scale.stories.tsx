import * as React from 'react';
import styled from 'styled-components';
import { colors } from '@keen.io/colors';

import ColorScale from './color-scale.component';

export default {
  title: 'Components /Color Scale',
  parameters: {
    component: ColorScale,
  },
};

const Grid = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
  padding: 20px;
`;

export const gradient = () => {
  return (
    <Grid>
      <ColorScale colors={['white', colors.lightBlue[500]]} />
    </Grid>
  );
};

export const step = () => {
  return (
    <Grid>
      <ColorScale
        colors={[
          colors.lightBlue[500],
          colors.orange[500],
          colors.yellow[500],
          colors.green[500],
          colors.pink[500],
        ]}
        mode="discrete"
      />
    </Grid>
  );
};

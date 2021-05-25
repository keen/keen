import * as React from 'react';
import styled from 'styled-components';
import ColorPicker from './color-picker.component';
import { colors as styleColors } from '@keen.io/colors';
import { action } from '@storybook/addon-actions';

const Wrapper = styled.div`
  width: 220px;
  border: 1px solid ${styleColors.gray[200]};
`;

export default {
  title: 'Components /Color Picker',
  parameters: {
    component: ColorPicker,
    componentSubtitle: 'Displays color picker',
  },
};

export const basic = () => (
  <Wrapper>
    <ColorPicker
      color="green"
      colorSuggestions={[
        styleColors.yellow[300],
        styleColors.black[300],
        styleColors.purple[300],
        styleColors.orange[300],
      ]}
      onColorChange={action('Selected color')}
      onClosePicker={action('Close picker')}
    />
  </Wrapper>
);

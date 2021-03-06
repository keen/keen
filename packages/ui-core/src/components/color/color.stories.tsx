import * as React from 'react';
import { action } from '@storybook/addon-actions';
import Color from './color.component';

export default {
  title: 'Components /Color Selector',
  parameters: {
    component: Color,
  },
};

export const basic = () => {
  return (
    <Color
      color={'teal'}
      colorSuggestions={['red', 'green', 'yellow']}
      onColorChange={action('color')}
    />
  );
};

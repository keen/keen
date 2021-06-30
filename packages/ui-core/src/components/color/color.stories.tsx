import * as React from 'react';
import Color from './color';
import { action } from '@storybook/addon-actions';

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

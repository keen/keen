import { addons } from '@storybook/addons';
import { themes, create } from '@storybook/theming/create';

const theme = create({
  ...themes.normal,
  brandImage:
    'https://keen.io/wp-content/uploads/2020/03/Keen-Chargify-dark-L.png',
});

addons.setConfig({
  theme,
}); 

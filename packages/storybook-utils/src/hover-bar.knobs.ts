import { boolean, select } from '@storybook/addon-knobs';

const hoverBarOptions = {
  dark: 'dark',
  light: 'light',
};

export const hoverBarKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  type: select(
    'Hover Bar type',
    hoverBarOptions,
    hoverBarOptions.dark,
    namespace
  ) as any,
});

module.exports = {
  stories: [
    '../docs/**/*.mdx',
    '../packages/**/*.stories.tsx',
    '../packages/**/*.mdx'
  ],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-notes',
    '@storybook/addon-actions',
    'storybook-addon-performance',
    '@storybook/addon-docs',
  ]
};

module.exports = {
  stories: [
    '../docs/**/*.mdx',
    '../packages/**/*.stories.tsx',
    '../packages/**/*.mdx'
  ],
  addons: ['@storybook/addon-knobs/register',
  '@storybook/addon-storysource/register',
  '@storybook/addon-notes/register',
  '@storybook/addon-actions/register',
  'storybook-addon-performance/register',
  '@storybook/addon-docs/register',
  ]
};
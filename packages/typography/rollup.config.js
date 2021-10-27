const { createRollupConfig } = require('@keen.io/dev-tools');
const packageJson = require('./package.json');

const config = createRollupConfig('src/index.ts', packageJson);

export default config;

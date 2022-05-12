import { createRollupConfig } from '@keen.io/dev-tools';
import packageJson from './package.json';

const config = createRollupConfig('src/index.ts', packageJson);

export default config;

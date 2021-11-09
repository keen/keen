import { RollupOptions } from 'rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';

/**
 * Creates rollup bundler configuration
 * @param input - package entry point
 * @param packageJson - package json definition
 *
 * @returns rollup configuration
 */
const createRollupConfig = (
  input: string,
  packageJson: Record<string, any>
): RollupOptions => ({
  input,
  external: [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ],
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      preferBuiltins: false,
      mainFields: ['browser'],
    }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    babel({
      babelHelpers: 'bundled',
      include: 'src/**/*.{tsx,ts,js,jsx}',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
});

export default createRollupConfig;

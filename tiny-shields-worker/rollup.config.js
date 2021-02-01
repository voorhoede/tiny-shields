import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: 'main.js',
  output: {
    dir: 'dist',
    format: 'iife',
  },
  plugins: [
    commonjs(),
    nodeResolve(),
  ],
};

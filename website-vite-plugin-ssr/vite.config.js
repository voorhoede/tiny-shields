import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import ssr from 'vite-plugin-ssr/plugin'
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [preact(), ssr(), visualizer()],
})

export default /** @type {import('astro').AstroUserConfig} */ ({
	renderers: ['@astrojs/renderer-preact'],
  buildOptions: {
    pageUrlFormat: 'file',
  },
});

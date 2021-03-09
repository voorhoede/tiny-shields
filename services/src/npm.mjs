import handledFetch from './handled-fetch.mjs';

const routes = [
  '/:packageName',
  '/:scope/:packageName',
];

const handler = ({ scope, packageName, parsedScope = scope ? `${scope}/` : '' }) => (
  handledFetch(
    `https://registry.npmjs.org/-/package/${parsedScope}${packageName}/dist-tags`
  )
    .then((response) => response.json())
    .then((data) => ({
      label: 'npm',
      message: data.latest,
      color: 'blue',
      maxAge: 60 * 60 * 24,
    }))
);

export default {
  routes,
  handler,
};

import handledFetch from './handled-fetch.mjs';

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

const routes = {
  '/:packageName': handler,
  '/:scope/:packageName': handler,
};

export default {
  handler,
  routes,
};

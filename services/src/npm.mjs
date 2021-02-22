const routes = [
  '/:packageName',
  '/:scope/:packageName',
];

const handler = ({ scope, packageName, parsedScope = scope ? `${scope}/` : '' }) => (
  fetch(
    `https://registry.npmjs.org/-/package/${parsedScope}${packageName}/dist-tags`
  )
    .then((response) => response.json())
    .then((data) => ({
      label: 'npm',
      message: data.latest,
      color: 'blue',
    }))
);

export default {
  routes,
  handler,
};

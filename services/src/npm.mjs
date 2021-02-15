const routes = [
  '/:id',
  '/:scope/:id',
];

const handler = ({ scope, id, parsedScope = scope ? `${scope}/` : '' }) => (
  fetch(
    `https://registry.npmjs.org/-/package/${parsedScope}${id}/dist-tags`
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

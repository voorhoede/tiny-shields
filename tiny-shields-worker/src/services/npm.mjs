import tinyBadgeMaker from 'tiny-badge-maker';

const routes = [
  '/:id',
  '/:scope/:id',
];

function handler({
  scope,
  id,
  parsedScope = scope ? `${scope}/` : ''
}) {
  return fetch(
    `https://registry.npmjs.org/-/package/${parsedScope}${id}/dist-tags`
  )
    .then((response) => response.json())
    .then((data) =>{
      return new Response(
        tinyBadgeMaker({
          label: 'npm',
          message: data.latest,
          color: 'blue',
        }),
        {
          headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': `max-age=${60 * 5}`,
            'Content-Disposition': 'inline',
          }
        }
      )
      });
}

export default {
  routes,
  handler,
};

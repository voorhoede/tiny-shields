import tinyBadgeMaker from 'tiny-badge-maker';

const statusMapping = {
  success: 'brightgreen',
  failed: 'red',
  building: 'yellow',
};

const routes = [
  '/:id',
];

function handler({ id }) {
  return fetch(`https://api.netlify.com/api/v1/badges/${id}/deploy-status`, {
    method: 'HEAD',
  })
    .then((response) => {
      const status = Object.keys(statusMapping).find((status) =>
        response.headers.get('Content-Disposition').includes(status)
      );

      return new Response(
        tinyBadgeMaker({
          label: 'netlify',
          message: status,
          color: statusMapping[status],
        }),
        {
          headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': `max-age=${60 * 5}`,
            'Content-Disposition': 'inline',
          },
        }
      );
    });
}

export default {
  routes,
  handler,
};

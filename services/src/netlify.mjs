const statusMapping = {
  'success': 'brightgreen',
  'failed': 'red',
  'building': 'yellow',
};

const routes = [
  '/:id',
];

const handler = ({ id }) => (
  fetch(
    `https://api.netlify.com/api/v1/badges/${id}/deploy-status`,
    { method: 'HEAD' }
  )
    .then((response) => {
      const status = Object.keys(statusMapping).find((status) =>
        response.headers.get('Content-Disposition').includes(status)
      );

      return {
        label: 'netlify',
        message: status,
        color: statusMapping[status],
      };
    })
);

export default {
  routes,
  handler,
};

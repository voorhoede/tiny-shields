const statusMapping = {
  'success': 'brightgreen',
  'failed': 'red',
  'building': 'yellow',
};

const routes = [
  '/:projectId',
];

const handler = ({ projectId }) => (
  fetch(
    `https://api.netlify.com/api/v1/badges/${projectId}/deploy-status`,
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
        maxAge: 60 * 60,
      };
    })
);

export default {
  routes,
  handler,
};

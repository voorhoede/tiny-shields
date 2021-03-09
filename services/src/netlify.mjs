import handledFetch from './handled-fetch.mjs';

const statusMapping = {
  'success': 'brightgreen',
  'failed': 'red',
  'building': 'yellow',
};

const routes = [
  '/:projectId',
];

const handler = ({ projectId }) => (
  handledFetch(
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

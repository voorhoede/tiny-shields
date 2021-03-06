const routes = [
  '/:label',
];

const handler = ({ label }) => (
  fetch(
    `https://worldtimeapi.org/api/timezone/Europe/Amsterdam`
  )
    .then((response) => response.json())
    .then((data) => ({
      label,
      message: data.utc_datetime,
      color: 'green',
    }))
);

export default {
  routes,
  handler,
};

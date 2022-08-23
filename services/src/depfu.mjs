import handledFetch from './handled-fetch.mjs';

const handler = ({ gitService, user, repository }) => (
  handledFetch(
    `https://depfu.com/${gitService}/shields/${user}/${repository}`
  )
    .then((response) => response.json())
    .then((data) => ({
        label: 'dependencies',
        message: data.text,
        color: data.colorscheme,
        maxAge: 60 * 60 * 24,
    }))
);

const routes = {
  '/:gitService/:user/:repository': handler,
};

export default {
  routes,
};

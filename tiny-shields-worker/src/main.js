import { exec, match, parse } from 'matchit';
import tinyBadgeMaker from 'tiny-badge-maker';
import lgtm from './services/lgtm.mjs';
import netlify from './services/netlify.mjs';
import npm from './services/npm.mjs';

const services = {
  lgtm,
  netlify,
  npm,
};

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url);

  if (pathname === '/dynamic') {
    return fetch(searchParams.get('url'))
      .then(response => response.json())
      .then((data) => (
        new Response(
          tinyBadgeMaker({
            message: data[searchParams.get('query')],
            label: searchParams.get('label'),
            color: searchParams.get('color'),
          }),
          {
            headers: {
              'Content-Type': 'image/svg+xml',
              'Cache-Control': `max-age=${60 * 5}`,
              'Content-Disposition': 'inline',
            },
          },
        )
      ));
  } else if (pathname.startsWith('/service')) {
    const { name } = exec(
      pathname,
      match(pathname, [parse('/service/:name/*')])
    );

    if (!name || !services[name]) {
      return new Response('Invalid service', { status: 400 });
    }

    const routeValues = exec(
      pathname,
      match(pathname, services[name].routes.map((route) =>
        parse(`/service/:name${route}`)
      ))
    );

    return services[name].handler(routeValues)
  }

  return new Response('Invalid endpoint', { status: 400 });
}

import { exec, match, parse } from 'matchit';
import tinyBadgeMaker from 'tiny-badge-maker';
import services from 'services';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url);

  if (pathname === '/live') {
    return fetch(searchParams.get('url'))
      .then((response) => response.json())
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
  } else {
    const { name } = exec(
      pathname,
      match(pathname, [parse('/:name/*')])
    );

    if (!name || !services[name]) {
      return new Response('Invalid service', { status: 400 });
    }

    const routeValues = exec(
      pathname,
      match(pathname, services[name].routes.map((route) =>
        parse(`/:name${route}`)
      ))
    );

    return services[name].handler(routeValues)
      .then((badgeData) => new Response(
        tinyBadgeMaker(badgeData),
        {
          headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': `max-age=${60 * 5}`,
            'Content-Disposition': 'inline',
          },
        }
      ));
  }
}

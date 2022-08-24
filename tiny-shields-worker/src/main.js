import matchRoute from 'my-way';
import { flatten } from 'flattenizer';
import tinyBadgeMaker from 'tiny-badge-maker';
import services from 'services';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const { pathname, searchParams } = new URL(event.request.url);

  if (pathname === '/live') {
    return fetch(searchParams.get('url'))
      .then((response) => response.json())
      .then((data) => (
        new Response(
          tinyBadgeMaker({
            message: flatten(data)[searchParams.get('query')],
            label: searchParams.get('label'),
            color: searchParams.get('color'),
          }),
          {
            headers: {
              'Content-Type': 'image/svg+xml;charset=utf-8',
              'Cache-Control': `max-age=${60 * 10},immutable`,
              'Content-Disposition': 'inline',
            },
          },
        )
      ));
  }

  if (
    pathname.startsWith('/assets') ||
    !pathname.endsWith('.svg')
  ) {
    console.log({ event });
    const file = await Deno.readFile('./dist/website/index.html');
    return new Response(file, {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  }

  const { serviceName } = matchRoute('/:serviceName/:path*', pathname);

  if (!serviceName || !services[serviceName]) {
    return new Response('Invalid service', { status: 400 });
  }

  let routeValues;
  const route = Object.keys(services[serviceName].routes).find((route) => {
    routeValues = matchRoute(
      `/:serviceName${route}`,
      pathname.replace('.svg', '')
    );
    return routeValues;
  });

  return services[serviceName].routes[route](routeValues)
    .catch((response) => ({
      label: response.url,
      message: response.statusText,
      color: 'lightgrey',
      maxAge: 60,
    }))
    .then(({ label, message, color, maxAge }) => {
      const response = new Response(
        tinyBadgeMaker({ label, message, color }),
        {
          headers: {
            'Content-Type': 'image/svg+xml;charset=utf-8',
            'Cache-Control': `max-age=${maxAge},immutable`,
            'Content-Disposition': 'inline',
          },
        }
      );

      return response;
    });
}
